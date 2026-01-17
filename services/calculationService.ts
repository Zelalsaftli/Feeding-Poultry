import type { Ingredient, FeedAnalysisResult } from '../types';

const sumProduct = (inclusions: number[], values: number[]): number => {
  return inclusions.reduce((acc, inclusion, i) => acc + (inclusion * (values[i] || 0)), 0);
};

export const calculateFeedAnalysis = (ingredients: Ingredient[]): FeedAnalysisResult => {
  const emptyResult: FeedAnalysisResult = { 
    totalInclusion: 0,
    totalCostPerTon: 0,
    totalCostPer100kg: 0,
    nutrients: {},
    ingredients: [],
    enzymeContributions: {},
  };

  if (!ingredients || ingredients.length === 0) {
    return emptyResult;
  }

  const totalInclusion = ingredients.reduce((sum, ing) => sum + ing.Inclusion_pct, 0);

  const enzymes = ingredients.filter(ing => ing.category === 'Enzymes');
  const otherIngredients = ingredients.filter(ing => ing.category !== 'Enzymes');
  
  const inclusions = otherIngredients.map(ing => ing.Inclusion_pct);

  const nutrientKeys = Object.keys(otherIngredients[0] || {}).filter(
    key => !['id', 'Name', 'Inclusion_pct', 'Price_USD_per_ton', 'category', 'description', 'standard_dosage_g_per_ton', 'matrix'].includes(key)
  );

  const results: Record<string, number> = {};

  // Step 1: Calculate nutrient profile from non-enzyme ingredients based on their contribution to the total feed.
  nutrientKeys.forEach(key => {
    const values = otherIngredients.map(ing => ing[key as keyof Ingredient] as number);
    const totalNutrientFromNonEnzymes = sumProduct(inclusions, values);
    // Correctly calculate the weighted average based on total inclusion.
    // This accounts for the dilution effect of enzyme carriers which have 0 base nutrients.
    results[key] = totalInclusion > 0 ? totalNutrientFromNonEnzymes / totalInclusion : 0;
  });

  // Step 2: Calculate and add enzyme contributions
  const enzymeContributions: FeedAnalysisResult['enzymeContributions'] = {};
  
  enzymes.forEach(enzyme => {
    const { Inclusion_pct, standard_dosage_g_per_ton, matrix, Name } = enzyme;
    if (!standard_dosage_g_per_ton || standard_dosage_g_per_ton <= 0 || !matrix) {
      return;
    }

    const actual_dosage_g_per_ton = Inclusion_pct * 10000; // 1% = 10000 g/ton
    const dosage_ratio = Math.min(1, actual_dosage_g_per_ton / standard_dosage_g_per_ton);
    
    const contributions: Record<string, number> = {};

    for (const key in matrix) {
      const nutrientKey = key as keyof typeof matrix;
      const releaseValue = matrix[nutrientKey] || 0;
      const contribution = releaseValue * dosage_ratio;
      
      // The matrix values are direct contributions (uplift) to the final feed's nutrient profile.
      results[nutrientKey] = (results[nutrientKey] || 0) + contribution;
      
      if(contribution > 1e-6) { // Only record meaningful contributions
        contributions[nutrientKey] = contribution;
      }
    }

    if (Object.keys(contributions).length > 0) {
        enzymeContributions[enzyme.id] = { name: Name, contributions };
    }
  });
  
  // Step 3: Calculate derived nutrients
  results.MECP_Ratio = results.CP_pct > 0 ? results.ME_kcal_per_kg / results.CP_pct : 0;
  results.CaAvP_Ratio = results.avP_pct > 0 ? results.Ca_pct / results.avP_pct : 0;
  results.K_Cl_Na_Ratio = results.Na_pct > 0 ? (results.K_pct + results.Cl_pct) / results.Na_pct : 0;
  results.dEB = 434.78 * results.Na_pct + 256.4 * results.K_pct - 281.69 * results.Cl_pct;
  
  // Step 4: Calculate final cost, including enzymes
  const totalCostPerTon = totalInclusion > 0 
    ? ingredients.reduce((acc, ing) => acc + (ing.Inclusion_pct * (ing.Price_USD_per_ton || 0)), 0) / 100
    : 0;

  return {
    totalInclusion,
    totalCostPerTon,
    totalCostPer100kg: totalCostPerTon / 10,
    nutrients: results,
    ingredients: ingredients,
    enzymeContributions,
  };
};
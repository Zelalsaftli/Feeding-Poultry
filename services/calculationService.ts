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
  };

  if (!ingredients || ingredients.length === 0) {
    return emptyResult;
  }

  const inclusions = ingredients.map(ing => ing.Inclusion_pct);
  const totalInclusion = inclusions.reduce((sum, val) => sum + val, 0);

  const nutrientKeys = Object.keys(ingredients[0] || {}).filter(
    key => !['id', 'Name', 'Inclusion_pct', 'Price_USD_per_ton', 'category', 'description', 'standard_dosage_g_per_ton', 'matrix'].includes(key)
  );

  const results: Record<string, number> = {};

  // Step 1: Calculate nutrient profile from all ingredients, normalized to a 100-part feed
  nutrientKeys.forEach(key => {
    const values = ingredients.map(ing => ing[key as keyof Ingredient] as number);
    results[key] = totalInclusion > 0 ? sumProduct(inclusions, values) / 100 : 0;
  });
  
  // Step 2: Calculate derived nutrients
  results.MECP_Ratio = results.CP_pct > 0 ? results.ME_kcal_per_kg / results.CP_pct : 0;
  results.CaAvP_Ratio = results.avP_pct > 0 ? results.Ca_pct / results.avP_pct : 0;
  results.K_Cl_Na_Ratio = results.Na_pct > 0 ? (results.K_pct + results.Cl_pct) / results.Na_pct : 0;
  results.dEB = 434.78 * results.Na_pct + 256.4 * results.K_pct - 281.69 * results.Cl_pct;
  
  // Step 3: Calculate final cost, based on a 100-part feed
  const totalCostPerTon = totalInclusion > 0 
    ? ingredients.reduce((acc, ing) => acc + (ing.Inclusion_pct * (ing.Price_USD_per_ton || 0)), 0) / 100
    : 0;

  return {
    totalInclusion,
    totalCostPerTon,
    totalCostPer100kg: totalCostPerTon / 10,
    nutrients: results,
    ingredients: ingredients,
  };
};
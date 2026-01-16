import type { Ingredient, RecommendationProfile, GrowthPhase, Enzyme, IngredientCategory, Vitamin, Mineral } from './types';

export const CATEGORY_NAMES_EN: Record<IngredientCategory, string> = {
  Energy: 'Energy Sources',
  Protein: 'Protein Sources',
  AminoAcids: 'Amino Acids',
  MineralSupplements: 'Mineral Supplements',
  Medicated: 'Medicated Additives',
  Other: 'Other Additives',
};

export const CATEGORY_COLORS: Record<IngredientCategory, string> = {
  Energy: 'bg-amber-400',
  Protein: 'bg-sky-500',
  AminoAcids: 'bg-lime-500',
  MineralSupplements: 'bg-slate-400',
  Medicated: 'bg-rose-500',
  Other: 'bg-violet-500',
};

// This must match the Ingredient type in types.ts
export const COLUMN_HEADERS_EN: Record<keyof Omit<Ingredient, 'id'>, string> = {
  Name: 'Name',
  description: 'Description',
  category: 'Category',
  Inclusion_pct: 'Inclusion %',
  CP_pct: 'Crude Protein %',
  ME_kcal_per_kg: 'ME (kcal/kg)',
  Ca_pct: 'Calcium %',
  avP_pct: 'Av. Phosphorus %',
  Na_pct: 'Sodium %',
  K_pct: 'Potassium %',
  Cl_pct: 'Chlorine %',
  Lys_pct: 'Lysine %',
  TSAA_pct: 'Met+Cys %',
  Thr_pct: 'Threonine %',
  Val_pct: 'Valine %',
  Ile_pct: 'Isoleucine %',
  Leu_pct: 'Leucine %',
  Arg_pct: 'Arginine %',
  Try_pct: 'Tryptophan %',
  Starch_pct: 'Starch %',
  CF_pct: 'Crude Fiber %',
  NDF_pct: 'NDF %',
  ADF_pct: 'ADF %',
  Ash_pct: 'Ash %',
  Choline_mg_per_kg: 'Choline (mg/kg)',
  Price_USD_per_ton: 'Price ($/ton)',
};

export const ANALYSIS_RESULTS_EN: Record<string, string> = {
  totalCostPerTon: 'Total Feed Cost ($/ton)',
  totalCostPer100kg: 'Total Feed Cost ($/100kg)',
  'nutrients.CP_pct': 'Crude Protein %',
  'nutrients.ME_kcal_per_kg': 'ME (kcal/kg)',
  'nutrients.MECP_Ratio': 'ME/CP Ratio',
  'nutrients.Ca_pct': 'Calcium %',
  'nutrients.avP_pct': 'Av. Phosphorus %',
  'nutrients.CaAvP_Ratio': 'Ca/Av. P Ratio',
  'nutrients.Na_pct': 'Sodium %',
  'nutrients.K_pct': 'Potassium %',
  'nutrients.Cl_pct': 'Chlorine %',
  'nutrients.K_Cl_Na_Ratio': '(K+Cl)/Na',
  'nutrients.dEB': 'dEB (mEq/kg)',
  'nutrients.Ash_pct': 'Ash %',
  'nutrients.Choline_mg_per_kg': 'Choline (mg/kg)',
  'nutrients.Lys_pct': 'Lysine %',
  'nutrients.TSAA_pct': 'Met+Cys %',
  'nutrients.Thr_pct': 'Threonine %',
  'nutrients.Val_pct': 'Valine %',
  'nutrients.Ile_pct': 'Isoleucine %',
  'nutrients.Leu_pct': 'Leucine %',
  'nutrients.Arg_pct': 'Arginine %',
  'nutrients.Try_pct': 'Tryptophan %',
  'nutrients.Starch_pct': 'Starch %',
  'nutrients.CF_pct': 'Crude Fiber %',
};

export const NUTRIENT_UNITS: Record<string, { baseUnit: string; units: Record<string, number> }> = {
  'totalCostPerTon': { baseUnit: '$/ton', units: { '$/ton': 1, '$/kg': 0.001 } },
  'totalCostPer100kg': { baseUnit: '$/100kg', units: { '$/100kg': 1, '$/kg': 0.01 } },
  'nutrients.CP_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10 } },
  'nutrients.ME_kcal_per_kg': { baseUnit: 'kcal/kg', units: { 'kcal/kg': 1, 'MJ/kg': 1 / 239.006 } },
  'nutrients.MECP_Ratio': { baseUnit: '', units: { '': 1 } },
  'nutrients.Ca_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10 } },
  'nutrients.avP_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10 } },
  'nutrients.CaAvP_Ratio': { baseUnit: '', units: { '': 1 } },
  'nutrients.Na_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10, 'ppm': 10000 } },
  'nutrients.K_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10, 'ppm': 10000 } },
  'nutrients.Cl_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10, 'ppm': 10000 } },
  'nutrients.K_Cl_Na_Ratio': { baseUnit: '', units: { '': 1 } },
  'nutrients.dEB': { baseUnit: 'mEq/kg', units: { 'mEq/kg': 1 } },
  'nutrients.Ash_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10 } },
  'nutrients.Choline_mg_per_kg': { baseUnit: 'mg/kg', units: { 'mg/kg': 1, 'g/kg': 0.001, '%': 0.0001, 'ppm': 1 } },
  'nutrients.Lys_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10 } },
  'nutrients.TSAA_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10 } },
  'nutrients.Thr_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10 } },
  'nutrients.Val_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10 } },
  'nutrients.Ile_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10 } },
  'nutrients.Leu_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10 } },
  'nutrients.Arg_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10 } },
  'nutrients.Try_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10 } },
  'nutrients.Starch_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10 } },
  'nutrients.CF_pct': { baseUnit: '%', units: { '%': 1, 'g/kg': 10 } },
};

export const convertValue = (
    baseValue: number, 
    nutrientKey: string, 
    targetUnit: string
): { value: number; unit: string } => {
    const definition = NUTRIENT_UNITS[nutrientKey];
    if (!definition) {
        return { value: baseValue, unit: '' }; // No definition, return as is
    }

    const factor = definition.units[targetUnit];
    if (factor === undefined) {
        // Fallback to base unit if target is invalid
        return { value: baseValue, unit: definition.baseUnit };
    }

    const convertedValue = baseValue * factor;
    return { value: convertedValue, unit: targetUnit };
};

export const ROSS_308_RECOMMENDATIONS: Record<GrowthPhase, RecommendationProfile> = {
  Starter: { // 0-10 days
    'nutrients.ME_kcal_per_kg': { min: 2925, max: 3025, unit: 'kcal/kg' },
    'nutrients.CP_pct': { min: 22.5, max: 23.5, unit: '%' },
    'nutrients.Lys_pct': { min: 1.32, max: 1.34, unit: '%' },
    'nutrients.TSAA_pct': { min: 1.00, max: 1.02, unit: '%' },
    'nutrients.Arg_pct': { min: 1.40, max: 1.42, unit: '%' },
    'nutrients.Thr_pct': { min: 0.88, max: 0.90, unit: '%' },
    'nutrients.Val_pct': { min: 1.00, max: 1.02, unit: '%' },
    'nutrients.Ile_pct': { min: 0.88, max: 0.90, unit: '%' },
    'nutrients.Ca_pct': { min: 0.93, max: 0.97, unit: '%' },
    'nutrients.avP_pct': { min: 0.48, max: 0.52, unit: '%' },
    'nutrients.Na_pct': { min: 0.18, max: 0.23, unit: '%' },
    'nutrients.Ash_pct': { min: 5.0, max: 6.5, unit: '%' },
    'nutrients.Choline_mg_per_kg': { min: 1700, max: Infinity, unit: 'mg/kg' },
    'nutrients.CaAvP_Ratio': { min: 1.8, max: 2.0, unit: '' },
  },
  Grower: { // 11-24 days
    'nutrients.ME_kcal_per_kg': { min: 3000, max: 3100, unit: 'kcal/kg' },
    'nutrients.CP_pct': { min: 21.0, max: 22.0, unit: '%' },
    'nutrients.Lys_pct': { min: 1.18, max: 1.20, unit: '%' },
    'nutrients.TSAA_pct': { min: 0.92, max: 0.94, unit: '%' },
    'nutrients.Arg_pct': { min: 1.27, max: 1.29, unit: '%' },
    'nutrients.Thr_pct': { min: 0.79, max: 0.81, unit: '%' },
    'nutrients.Val_pct': { min: 0.91, max: 0.93, unit: '%' },
    'nutrients.Ile_pct': { min: 0.80, max: 0.82, unit: '%' },
    'nutrients.Ca_pct': { min: 0.73, max: 0.77, unit: '%' },
    'nutrients.avP_pct': { min: 0.40, max: 0.44, unit: '%' },
    'nutrients.Na_pct': { min: 0.18, max: 0.23, unit: '%' },
    'nutrients.Ash_pct': { min: 5.0, max: 6.0, unit: '%' },
    'nutrients.Choline_mg_per_kg': { min: 1600, max: Infinity, unit: 'mg/kg' },
    'nutrients.CaAvP_Ratio': { min: 1.7, max: 1.9, unit: '' },
  },
  'Finisher 1': { // 25-39 days
    'nutrients.ME_kcal_per_kg': { min: 3050, max: 3150, unit: 'kcal/kg' },
    'nutrients.CP_pct': { min: 19.0, max: 20.0, unit: '%' },
    'nutrients.Lys_pct': { min: 1.08, max: 1.10, unit: '%' },
    'nutrients.TSAA_pct': { min: 0.86, max: 0.88, unit: '%' },
    'nutrients.Arg_pct': { min: 1.17, max: 1.19, unit: '%' },
    'nutrients.Thr_pct': { min: 0.72, max: 0.74, unit: '%' },
    'nutrients.Val_pct': { min: 0.84, max: 0.86, unit: '%' },
    'nutrients.Ile_pct': { min: 0.75, max: 0.77, unit: '%' },
    'nutrients.Ca_pct': { min: 0.68, max: 0.72, unit: '%' },
    'nutrients.avP_pct': { min: 0.38, max: 0.42, unit: '%' },
    'nutrients.Na_pct': { min: 0.16, max: 0.21, unit: '%' },
    'nutrients.Ash_pct': { min: 4.5, max: 5.5, unit: '%' },
    'nutrients.Choline_mg_per_kg': { min: 1500, max: Infinity, unit: 'mg/kg' },
    'nutrients.CaAvP_Ratio': { min: 1.6, max: 1.8, unit: '' },
  },
   'Finisher 2': { // +40 days
    'nutrients.ME_kcal_per_kg': { min: 3100, max: 3200, unit: 'kcal/kg' },
    'nutrients.CP_pct': { min: 18.0, max: 19.0, unit: '%' },
    'nutrients.Lys_pct': { min: 1.02, max: 1.04, unit: '%' },
    'nutrients.TSAA_pct': { min: 0.82, max: 0.84, unit: '%' },
    'nutrients.Arg_pct': { min: 1.12, max: 1.14, unit: '%' },
    'nutrients.Thr_pct': { min: 0.68, max: 0.70, unit: '%' },
    'nutrients.Val_pct': { min: 0.80, max: 0.82, unit: '%' },
    'nutrients.Ile_pct': { min: 0.70, max: 0.72, unit: '%' },
    'nutrients.Ca_pct': { min: 0.63, max: 0.67, unit: '%' },
    'nutrients.avP_pct': { min: 0.35, max: 0.39, unit: '%' },
    'nutrients.Na_pct': { min: 0.16, max: 0.21, unit: '%' },
    'nutrients.Ash_pct': { min: 4.5, max: 5.5, unit: '%' },
    'nutrients.Choline_mg_per_kg': { min: 1400, max: Infinity, unit: 'mg/kg' },
    'nutrients.CaAvP_Ratio': { min: 1.6, max: 1.8, unit: '' },
  },
};


export const initialIngredients: Ingredient[] = [
  { id: 1, Name: 'Yellow Corn', description: 'Primary energy source in feeds, rich in starch.', category: 'Energy', Inclusion_pct: 60.00, CP_pct: 7.8, ME_kcal_per_kg: 3350, Ca_pct: 0.02, avP_pct: 0.05, Na_pct: 0.02, K_pct: 0.3, Cl_pct: 0.05, Lys_pct: 0.21, TSAA_pct: 0.29, Thr_pct: 0.28, Val_pct: 0.34, Ile_pct: 0.26, Leu_pct: 0.91, Arg_pct: 0.36, Try_pct: 0.06, Starch_pct: 62, CF_pct: 2.2, NDF_pct: 9.5, ADF_pct: 2.8, Ash_pct: 1.5, Choline_mg_per_kg: 550, Price_USD_per_ton: 325 },
  { id: 25, Name: 'Wheat', description: 'Energy and protein source, with a good starch content.', category: 'Energy', Inclusion_pct: 0, CP_pct: 13.0, ME_kcal_per_kg: 3150, Ca_pct: 0.05, avP_pct: 0.17, Na_pct: 0.02, K_pct: 0.45, Cl_pct: 0.07, Lys_pct: 0.32, TSAA_pct: 0.42, Thr_pct: 0.36, Val_pct: 0.50, Ile_pct: 0.40, Leu_pct: 0.85, Arg_pct: 0.60, Try_pct: 0.15, Starch_pct: 60, CF_pct: 3.0, NDF_pct: 11, ADF_pct: 4, Ash_pct: 1.8, Choline_mg_per_kg: 1000, Price_USD_per_ton: 350 },
  { id: 23, Name: 'Barley', description: 'Alternative energy source, contains higher fiber than corn.', category: 'Energy', Inclusion_pct: 0, CP_pct: 11.5, ME_kcal_per_kg: 2650, Ca_pct: 0.06, avP_pct: 0.16, Na_pct: 0.02, K_pct: 0.5, Cl_pct: 0.1, Lys_pct: 0.38, TSAA_pct: 0.40, Thr_pct: 0.35, Val_pct: 0.55, Ile_pct: 0.38, Leu_pct: 0.75, Arg_pct: 0.50, Try_pct: 0.14, Starch_pct: 55, CF_pct: 5.5, NDF_pct: 18, ADF_pct: 7, Ash_pct: 2.5, Choline_mg_per_kg: 900, Price_USD_per_ton: 350 },
  { id: 24, Name: 'Wheat Bran', description: 'By-product rich in fiber and protein, used to improve digestion.', category: 'Energy', Inclusion_pct: 0, CP_pct: 15.5, ME_kcal_per_kg: 1400, Ca_pct: 0.13, avP_pct: 0.35, Na_pct: 0.05, K_pct: 1.2, Cl_pct: 0.1, Lys_pct: 0.65, TSAA_pct: 0.45, Thr_pct: 0.50, Val_pct: 0.75, Ile_pct: 0.55, Leu_pct: 1.0, Arg_pct: 1.0, Try_pct: 0.20, Starch_pct: 20, CF_pct: 11, NDF_pct: 40, ADF_pct: 13, Ash_pct: 6, Choline_mg_per_kg: 1200, Price_USD_per_ton: 220 },
  { id: 3, Name: 'Soybean Oil', description: 'Concentrated energy source high in fat, used to increase feed energy density.', category: 'Energy', Inclusion_pct: 4.00, CP_pct: 0, ME_kcal_per_kg: 8800, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 0, Choline_mg_per_kg: 0, Price_USD_per_ton: 1500 },
  { id: 26, Name: 'Molasses', description: 'Sugar industry by-product, used as an energy source and palatability enhancer.', category: 'Energy', Inclusion_pct: 0, CP_pct: 4.0, ME_kcal_per_kg: 2500, Ca_pct: 0.9, avP_pct: 0.08, Na_pct: 0.1, K_pct: 3.5, Cl_pct: 1.2, Lys_pct: 0.15, TSAA_pct: 0.06, Thr_pct: 0.1, Val_pct: 0.2, Ile_pct: 0.1, Leu_pct: 0.3, Arg_pct: 0.2, Try_pct: 0.02, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 9, Choline_mg_per_kg: 600, Price_USD_per_ton: 180 },
  { id: 2, Name: 'Soybean Meal 44%', description: 'Primary vegetable protein source, rich in amino acids.', category: 'Protein', Inclusion_pct: 30.00, CP_pct: 44, ME_kcal_per_kg: 2230, Ca_pct: 0.3, avP_pct: 0.28, Na_pct: 0.03, K_pct: 2.0, Cl_pct: 0.06, Lys_pct: 2.52, TSAA_pct: 1.08, Thr_pct: 1.52, Val_pct: 1.87, Ile_pct: 1.79, Leu_pct: 3.02, Arg_pct: 3.0, Try_pct: 0.6, Starch_pct: 5, CF_pct: 7, NDF_pct: 12, ADF_pct: 9, Ash_pct: 6.0, Choline_mg_per_kg: 2800, Price_USD_per_ton: 500 },
  { id: 27, Name: 'Soybean Meal 46%', description: 'Highly concentrated vegetable protein source, dehulled.', category: 'Protein', Inclusion_pct: 0, CP_pct: 46, ME_kcal_per_kg: 2350, Ca_pct: 0.32, avP_pct: 0.30, Na_pct: 0.03, K_pct: 2.1, Cl_pct: 0.06, Lys_pct: 2.85, TSAA_pct: 1.35, Thr_pct: 1.85, Val_pct: 2.2, Ile_pct: 2.1, Leu_pct: 3.6, Arg_pct: 3.4, Try_pct: 0.65, Starch_pct: 4, CF_pct: 6, NDF_pct: 10, ADF_pct: 8, Ash_pct: 6.5, Choline_mg_per_kg: 2900, Price_USD_per_ton: 520 },
  { id: 36, Name: 'Canola Meal', description: 'Good vegetable protein source, alternative to soybean meal.', category: 'Protein', Inclusion_pct: 0, CP_pct: 37.0, ME_kcal_per_kg: 2250, Ca_pct: 0.65, avP_pct: 0.35, Na_pct: 0.06, K_pct: 1.2, Cl_pct: 0.1, Lys_pct: 1.9, TSAA_pct: 1.3, Thr_pct: 1.5, Val_pct: 1.8, Ile_pct: 1.5, Leu_pct: 2.7, Arg_pct: 2.2, Try_pct: 0.5, Starch_pct: 4, CF_pct: 12, NDF_pct: 22, ADF_pct: 16, Ash_pct: 7, Choline_mg_per_kg: 6000, Price_USD_per_ton: 400 },
  { id: 37, Name: 'Corn Gluten Meal', description: 'Highly concentrated vegetable protein, rich in methionine but poor in lysine.', category: 'Protein', Inclusion_pct: 0, CP_pct: 60.0, ME_kcal_per_kg: 3900, Ca_pct: 0.05, avP_pct: 0.20, Na_pct: 0.05, K_pct: 0.3, Cl_pct: 0.1, Lys_pct: 1.6, TSAA_pct: 3.8, Thr_pct: 2.0, Val_pct: 2.5, Ile_pct: 2.0, Leu_pct: 9.0, Arg_pct: 2.5, Try_pct: 0.4, Starch_pct: 15, CF_pct: 2.5, NDF_pct: 6, ADF_pct: 3, Ash_pct: 2, Choline_mg_per_kg: 500, Price_USD_per_ton: 750 },
  { id: 38, Name: 'Fish Meal', description: 'High-quality animal protein source, rich in essential amino acids and minerals.', category: 'Protein', Inclusion_pct: 0, CP_pct: 66.0, ME_kcal_per_kg: 3200, Ca_pct: 5.0, avP_pct: 2.5, Na_pct: 0.7, K_pct: 0.8, Cl_pct: 0.9, Lys_pct: 5.0, TSAA_pct: 2.8, Thr_pct: 2.9, Val_pct: 3.2, Ile_pct: 3.0, Leu_pct: 5.0, Arg_pct: 3.8, Try_pct: 0.7, Starch_pct: 0, CF_pct: 1, NDF_pct: 1, ADF_pct: 1, Ash_pct: 15, Choline_mg_per_kg: 3500, Price_USD_per_ton: 2200 },
  { id: 12, Name: 'Dry Yeast', description: 'Rich source of protein and B vitamins, promotes gut health.', category: 'Protein', Inclusion_pct: 0, CP_pct: 45, ME_kcal_per_kg: 2800, Ca_pct: 0.2, avP_pct: 1.2, Na_pct: 0.1, K_pct: 2.2, Cl_pct: 0.2, Lys_pct: 3.5, TSAA_pct: 1.2, Thr_pct: 2.2, Val_pct: 2.5, Ile_pct: 2.1, Leu_pct: 3.2, Arg_pct: 2.3, Try_pct: 0.5, Starch_pct: 8, CF_pct: 3, NDF_pct: 7, ADF_pct: 4, Ash_pct: 8, Choline_mg_per_kg: 4000, Price_USD_per_ton: 2700 },
  { id: 8, Name: 'DL-Methionine', description: 'Synthetic amino acid, used to improve protein balance in feed.', category: 'AminoAcids', Inclusion_pct: 0.35, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 99, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 0, Choline_mg_per_kg: 0, Price_USD_per_ton: 3600 },
  { id: 9, Name: 'L-Lysine HCL', description: 'Synthetic amino acid, considered the first limiting amino acid for poultry.', category: 'AminoAcids', Inclusion_pct: 0.25, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 75.5, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 0, Choline_mg_per_kg: 0, Price_USD_per_ton: 2000 },
  { id: 10, Name: 'L-Threonine', description: 'Synthetic amino acid, used to support growth and feather production.', category: 'AminoAcids', Inclusion_pct: 0.05, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 96, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 0, Choline_mg_per_kg: 0, Price_USD_per_ton: 2350 },
  { id: 20, Name: 'L-Arginine', category: 'AminoAcids', description: 'Essential amino acid', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 96, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 0, Choline_mg_per_kg: 0, Price_USD_per_ton: 6500 },
  { id: 21, Name: 'L-Valine', category: 'AminoAcids', description: 'Essential amino acid', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 96, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 0, Choline_mg_per_kg: 0, Price_USD_per_ton: 5000 },
  { id: 22, Name: 'L-Isoleucine', category: 'AminoAcids', description: 'Essential amino acid', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 96, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 0, Choline_mg_per_kg: 0, Price_USD_per_ton: 7000 },
  { id: 4, Name: 'Limestone', description: 'Primary source of calcium, essential for bone formation.', category: 'MineralSupplements', Inclusion_pct: 1.5, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 36, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 98.0, Choline_mg_per_kg: 0, Price_USD_per_ton: 40 },
  { id: 30, Name: 'Pure Calcium Carbonate', description: 'High-purity source of calcium.', category: 'MineralSupplements', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 40, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 99.5, Choline_mg_per_kg: 0, Price_USD_per_ton: 65 },
  { id: 5, Name: 'Dicalcium Phosphate', description: 'Value represents available phosphorus (approx. 85% of total P)', category: 'MineralSupplements', Inclusion_pct: 1.5, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 22, avP_pct: 16, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 55.0, Choline_mg_per_kg: 0, Price_USD_per_ton: 800 },
  { id: 31, Name: 'Monocalcium Phosphate', description: 'Value represents available phosphorus (approx. 95% of total P)', category: 'MineralSupplements', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 16.5, avP_pct: 20, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 58.0, Choline_mg_per_kg: 0, Price_USD_per_ton: 1600 },
  { id: 6, Name: 'Salt (NaCl)', description: 'Source of sodium and chlorine, essential for ionic balance.', category: 'MineralSupplements', Inclusion_pct: 0.35, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 39, K_pct: 0, Cl_pct: 60, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 100, Choline_mg_per_kg: 0, Price_USD_per_ton: 100 },
  { id: 17, Name: 'Sodium Bicarbonate', description: 'Source of sodium and used as a body pH buffer.', category: 'MineralSupplements', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 27, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 100, Choline_mg_per_kg: 0, Price_USD_per_ton: 750 },
  { id: 16, Name: 'Sodium Sulphate', description: 'Source of sodium and sulfur.', category: 'MineralSupplements', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 32, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 100, Choline_mg_per_kg: 0, Price_USD_per_ton: 900 },
  { id: 14, Name: 'Anti-inflammatory', description: 'Medicated additive to control inflammatory responses.', category: 'Medicated', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 40, Choline_mg_per_kg: 0, Price_USD_per_ton: 6250 },
  { id: 15, Name: 'Anticoccidial', description: 'Medicated additive to prevent coccidiosis infection.', category: 'Medicated', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 60, Choline_mg_per_kg: 0, Price_USD_per_ton: 40000 },
  { id: 28, Name: 'Vitamin Premix', description: 'Concentrated mix of essential vitamins to support health and growth.', category: 'Other', Inclusion_pct: 0.25, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 50.0, Choline_mg_per_kg: 0, Price_USD_per_ton: 10000 },
  { id: 29, Name: 'Mineral Premix', description: 'Concentrated mix of trace minerals to support vital functions.', category: 'Other', Inclusion_pct: 0.25, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 95.0, Choline_mg_per_kg: 0, Price_USD_per_ton: 4000 },
  { id: 11, Name: 'Dry Pomegranate Peels', description: 'Natural additive rich in antioxidants, used to improve general health.', category: 'Other', Inclusion_pct: 0, CP_pct: 5, ME_kcal_per_kg: 1500, Ca_pct: 0.4, avP_pct: 0.1, Na_pct: 0.05, K_pct: 1.2, Cl_pct: 0.1, Lys_pct: 0.1, TSAA_pct: 0.08, Thr_pct: 0.1, Val_pct: 0.15, Ile_pct: 0.1, Leu_pct: 0.2, Arg_pct: 0.15, Try_pct: 0.05, Starch_pct: 2, CF_pct: 18, NDF_pct: 35, ADF_pct: 25, Ash_pct: 6, Choline_mg_per_kg: 300, Price_USD_per_ton: 350 },
  { id: 13, Name: 'Antioxidant', description: 'Additive to protect fats and vitamins from oxidation in the feed.', category: 'Other', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 50, Choline_mg_per_kg: 0, Price_USD_per_ton: 5000 },
  { id: 18, Name: 'Mold Inhibitor', description: 'Additive to prevent mold growth and maintain feed quality.', category: 'Other', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 55, Choline_mg_per_kg: 0, Price_USD_per_ton: 2250 },
  { id: 19, Name: 'Mycotoxin Binder', description: 'Additive to bind mycotoxins and prevent their absorption in the gut.', category: 'Other', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0.1, K_pct: 0.5, Cl_pct: 0.1, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 90, Choline_mg_per_kg: 0, Price_USD_per_ton: 2150 },
  { id: 32, Name: 'Fat Emulsifier', category: 'Other', description: 'Aids in the digestion and absorption of fats, improving energy value.', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 50, Choline_mg_per_kg: 0, Price_USD_per_ton: 4500 },
  { id: 33, Name: 'Zeolite', category: 'Other', description: 'Natural material used as an anti-caking agent and mycotoxin binder.', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 95, Choline_mg_per_kg: 0, Price_USD_per_ton: 250 },
  { id: 34, Name: 'Pellet Binder', category: 'Other', description: 'Improves the quality and durability of feed pellets.', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 500, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 60, Choline_mg_per_kg: 0, Price_USD_per_ton: 600 },
  { id: 35, Name: 'Choline Chloride 60%', category: 'Other', description: 'Primary source of choline, an essential vitamin. 60% choline chloride on a vegetable carrier.', Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 5, NDF_pct: 10, ADF_pct: 7, Ash_pct: 5, Choline_mg_per_kg: 447600, Price_USD_per_ton: 1200 },
];

export const initialEnzymes: Enzyme[] = [
  {
    id: 'phytase-standard',
    name: 'Phytase (Standard)',
    dosage_g_per_ton: 0,
    standard_dosage_g_per_ton: 100,
    Price_USD_per_ton: 15000,
    matrix: {
      avP_pct: 0.12,
      Ca_pct: 0.10,
      ME_kcal_per_kg: 50,
      CP_pct: 0.4,
      Lys_pct: 0.015,
      TSAA_pct: 0.012,
    },
  },
  {
    id: 'xylanase-standard',
    name: 'Xylanase (Standard)',
    dosage_g_per_ton: 0,
    standard_dosage_g_per_ton: 50,
    Price_USD_per_ton: 12000,
    matrix: {
      ME_kcal_per_kg: 75,
    },
  },
  {
    id: 'protease-standard',
    name: 'Protease (Standard)',
    dosage_g_per_ton: 0,
    standard_dosage_g_per_ton: 200,
    Price_USD_per_ton: 18000,
    matrix: {
      CP_pct: 0.8,
      Lys_pct: 0.03,
      TSAA_pct: 0.02,
      Thr_pct: 0.025,
    },
  },
  {
    id: 'multi-enzyme-standard',
    name: 'Multi-Enzyme (Standard)',
    dosage_g_per_ton: 0,
    standard_dosage_g_per_ton: 150,
    Price_USD_per_ton: 25000,
    matrix: {
      ME_kcal_per_kg: 80,
      CP_pct: 0.9,
      Lys_pct: 0.035,
      TSAA_pct: 0.025,
      Thr_pct: 0.03,
      avP_pct: 0.13,
      Ca_pct: 0.11,
    },
  },
];


export const initialVitaminsData: Vitamin[] = [
  { id: 'vitA', name: 'Vitamin A', unit: 'IU', requiredInFeed: 10000, purity: 500000, processingLossPct: 15, storageLossPct: 10, pricePerKg: 20 },
  { id: 'vitD3', name: 'Vitamin D3', unit: 'IU', requiredInFeed: 3000, purity: 500000, processingLossPct: 15, storageLossPct: 10, pricePerKg: 25 },
  { id: 'vitE', name: 'Vitamin E', unit: 'IU', requiredInFeed: 50, purity: 500, processingLossPct: 20, storageLossPct: 15, pricePerKg: 30 },
  { id: 'vitK3', name: 'Vitamin K3', unit: 'mg', requiredInFeed: 3, purity: 500, processingLossPct: 10, storageLossPct: 10, pricePerKg: 15 },
  { id: 'vitB1', name: 'Vitamin B1 (Thiamine)', unit: 'mg', requiredInFeed: 2.5, purity: 980, processingLossPct: 5, storageLossPct: 5, pricePerKg: 40 },
  { id: 'vitB2', name: 'Vitamin B2 (Riboflavin)', unit: 'mg', requiredInFeed: 7, purity: 800, processingLossPct: 5, storageLossPct: 5, pricePerKg: 35 },
  { id: 'vitB6', name: 'Vitamin B6 (Pyridoxine)', unit: 'mg', requiredInFeed: 4, purity: 980, processingLossPct: 5, storageLossPct: 5, pricePerKg: 45 },
  { id: 'vitB12', name: 'Vitamin B12 (Cobalamin)', unit: 'mg', requiredInFeed: 0.02, purity: 1, processingLossPct: 5, storageLossPct: 5, pricePerKg: 100 },
  { id: 'niacin', name: 'Niacin (B3)', unit: 'mg', requiredInFeed: 50, purity: 990, processingLossPct: 2, storageLossPct: 2, pricePerKg: 12 },
  { id: 'pantothenic', name: 'Pantothenic Acid (B5)', unit: 'mg', requiredInFeed: 12, purity: 980, processingLossPct: 2, storageLossPct: 2, pricePerKg: 22 },
  { id: 'folic', name: 'Folic Acid (B9)', unit: 'mg', requiredInFeed: 1.5, purity: 960, processingLossPct: 10, storageLossPct: 10, pricePerKg: 50 },
  { id: 'biotin', name: 'Biotin (B7)', unit: 'mg', requiredInFeed: 0.15, purity: 20, processingLossPct: 2, storageLossPct: 2, pricePerKg: 60 },
];

export const initialMineralsData: Mineral[] = [
    { 
        id: 'zn', 
        name: 'Zinc (Zn)', 
        requiredInFeed_mg_per_kg: 100, 
        selectedSourceIndex: 0,
        sources: [
            { name: 'Zinc Sulphate', productConcentration_pct: 22.0, pricePerKg: 2.5 },
            { name: 'Zinc Oxide', productConcentration_pct: 75.0, pricePerKg: 2.2 },
        ] 
    },
    { 
        id: 'fe', 
        name: 'Iron (Fe)', 
        requiredInFeed_mg_per_kg: 80, 
        selectedSourceIndex: 0,
        sources: [
            { name: 'Ferrous Sulphate', productConcentration_pct: 20.0, pricePerKg: 1.8 },
        ] 
    },
    {
        id: 'mn',
        name: 'Manganese (Mn)',
        requiredInFeed_mg_per_kg: 100,
        selectedSourceIndex: 0,
        sources: [
            { name: 'Manganese Sulphate', productConcentration_pct: 32.0, pricePerKg: 2.2 },
            { name: 'Manganese Oxide', productConcentration_pct: 62.0, pricePerKg: 1.9 },
        ]
    },
    { 
        id: 'cu', 
        name: 'Copper (Cu)', 
        requiredInFeed_mg_per_kg: 15, 
        selectedSourceIndex: 0,
        sources: [
            { name: 'Copper Sulphate', productConcentration_pct: 25.5, pricePerKg: 3.0 },
        ] 
    },
    {
        id: 'i',
        name: 'Iodine (I)',
        requiredInFeed_mg_per_kg: 1,
        selectedSourceIndex: 0,
        sources: [
            { name: 'Calcium Iodate', productConcentration_pct: 62.0, pricePerKg: 25.0 },
            { name: 'Potassium Iodide', productConcentration_pct: 76.0, pricePerKg: 30.0 },
        ]
    },
    { 
        id: 'se', 
        name: 'Selenium (Se)', 
        requiredInFeed_mg_per_kg: 0.3, 
        selectedSourceIndex: 0,
        sources: [
            { name: 'Sodium Selenite (1% Se)', productConcentration_pct: 1.0, pricePerKg: 15.0 },
        ] 
    },
];
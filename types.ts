export type IngredientCategory = 'Energy' | 'Protein' | 'AminoAcids' | 'MineralSupplements' | 'Medicated' | 'Other';
export type InclusionMode = 'percent' | 'kg_per_ton';

export interface Ingredient {
  id: number;
  Name: string;
  description?: string;
  category: IngredientCategory;
  Inclusion_pct: number;
  CP_pct: number;
  ME_kcal_per_kg: number;
  Ca_pct: number;
  avP_pct: number;
  Na_pct: number;
  K_pct: number;
  Cl_pct: number;
  Lys_pct: number;
  TSAA_pct: number;
  Thr_pct: number;
  Val_pct: number;
  Ile_pct: number;
  Leu_pct: number;
  Arg_pct: number;
  Try_pct: number;
  Starch_pct: number;
  CF_pct: number;
  NDF_pct: number;
  ADF_pct: number;
  Ash_pct: number;
  Choline_mg_per_kg: number;
  Price_USD_per_ton: number;
}

export interface MixAnalysisResult {
  totalInclusion: number;
  totalCostPerTon: number;
  totalCostPer100kg: number;
  [key: string]: number | Record<string, number>;
  nutrients: Record<string, number>;
}

export type GrowthPhase = 'Starter' | 'Grower' | 'Finisher 1' | 'Finisher 2';

export interface AviagenRecommendation {
  min: number;
  max: number;
  unit: string;
}

export type RecommendationProfile = Record<string, AviagenRecommendation>;
export type RecommendationOverrides = Record<string, { min: number; max: number }>;


export enum Page {
  SELECTION = 'selection',
  INPUT = 'input',
  ANALYSIS = 'analysis',
  VITAMIN_PREMIX = 'vitamin_premix',
  MINERAL_PREMIX = 'mineral_premix',
}

export interface Enzyme {
  id: string;
  name: string;
  dosage_g_per_ton: number; // The actual dosage used in the mix
  standard_dosage_g_per_ton: number; // The dosage for which the matrix is defined
  max_effective_dosage_g_per_ton: number; // The dosage at which the effect plateaus
  Price_USD_per_ton: number;
  matrix: Partial<Record<keyof Omit<Ingredient, 'id' | 'Name' | 'Inclusion_pct' | 'Price_USD_per_ton' | 'description' | 'category'>, number>>;
}

export type VitaminUnit = 'IU' | 'mg';

export interface Vitamin {
  id: string;
  name: string;
  unit: VitaminUnit;
  // User Inputs for the source product
  purity: number; // e.g., 500000 IU/g for Vit A, or 980 mg/g for B1 (98%)
  pricePerKg: number; // Price of the vitamin source product
  
  // User Inputs for formulation
  requiredInFeed: number; // e.g., 10000 IU/kg in final feed
  processingLossPct: number; // e.g., 10%
  storageLossPct: number; // e.g., 5%
}

export interface MineralSource {
  name: string;
  productConcentration_pct: number;
  pricePerKg: number;
}

export interface Mineral {
    id: string;
    name: string;
    requiredInFeed_mg_per_kg: number;
    sources: MineralSource[];
    selectedSourceIndex: number;
}
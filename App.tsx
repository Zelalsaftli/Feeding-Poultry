import React, { useState, useMemo, useCallback, useEffect } from 'react';
import type { Ingredient, FeedAnalysisResult, GrowthPhase, InclusionMode, RecommendationOverrides } from './types';
import { Page } from './types';
import { calculateFeedAnalysis } from './services/calculationService';
import SelectionPage from './components/SelectionPage';
import InputPage from './components/InputPage';
import AnalysisPage from './components/AnalysisPage';
import VitaminPremixPage from './components/VitaminPremixPage';
import MineralPremixPage from './components/MineralPremixPage';
import Header from './components/Header';
import Footer from './components/Footer';
import InclusionConfirmationModal from './components/InclusionConfirmationModal';
import { initialIngredients, ANALYSIS_RESULTS, NUTRIENT_UNITS } from './constants';

const defaultNutrientVisibility = Object.keys(ANALYSIS_RESULTS).reduce((acc, key) => {
  acc[key] = true;
  return acc;
}, {} as Record<string, boolean>);

const defaultNutrientUnits = Object.keys(NUTRIENT_UNITS).reduce((acc, key) => {
  acc[key] = NUTRIENT_UNITS[key].baseUnit;
  return acc;
}, {} as Record<string, string>);


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.SELECTION);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<FeedAnalysisResult>(() => calculateFeedAnalysis([]));
  const [animationClass, setAnimationClass] = useState('fade-in');
  const [isNormalizationModalOpen, setIsNormalizationModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  
  // Load settings from localStorage with defaults
  const [growthPhase, setGrowthPhase] = useState<GrowthPhase>(() => {
    const saved = localStorage.getItem('growthPhase');
    return (saved as GrowthPhase) || 'Starter';
  });
  
  const [inclusionMode, setInclusionMode] = useState<InclusionMode>(() => {
    const saved = localStorage.getItem('inclusionMode');
    return (saved as InclusionMode) || 'percent';
  });

  const [masterIngredients, setMasterIngredients] = useState<Ingredient[]>(() => {
    const saved = localStorage.getItem('masterIngredients_v2');
    return saved ? JSON.parse(saved) : initialIngredients;
  });
  
  const [recommendationOverrides, setRecommendationOverrides] = useState<RecommendationOverrides>(() => {
    const saved = localStorage.getItem('recommendationOverrides');
    return saved ? JSON.parse(saved) : {};
  });

  const [nutrientVisibility, setNutrientVisibility] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('nutrientVisibility');
    return saved ? JSON.parse(saved) : defaultNutrientVisibility;
  });

  const [nutrientUnits, setNutrientUnits] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('nutrientUnits');
    return saved ? JSON.parse(saved) : defaultNutrientUnits;
  });
  
  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('masterIngredients_v2', JSON.stringify(masterIngredients));
  }, [masterIngredients]);

  useEffect(() => {
    localStorage.setItem('growthPhase', growthPhase);
  }, [growthPhase]);

  useEffect(() => {
    localStorage.setItem('inclusionMode', inclusionMode);
  }, [inclusionMode]);

  useEffect(() => {
    localStorage.setItem('recommendationOverrides', JSON.stringify(recommendationOverrides));
  }, [recommendationOverrides]);

  useEffect(() => {
    localStorage.setItem('nutrientVisibility', JSON.stringify(nutrientVisibility));
  }, [nutrientVisibility]);

  useEffect(() => {
    localStorage.setItem('nutrientUnits', JSON.stringify(nutrientUnits));
  }, [nutrientUnits]);


  useEffect(() => {
    setIsLoadingAnalysis(true);
    const timer = setTimeout(() => {
        setAnalysisResult(calculateFeedAnalysis(ingredients));
        setIsLoadingAnalysis(false);
    }, 50);

    return () => clearTimeout(timer);
  }, [ingredients]);

  const performNavigation = (page: Page) => {
    setAnimationClass('fade-out');
    setTimeout(() => {
      setCurrentPage(page);
      setAnimationClass('fade-in');
    }, 200);
  };
  
  const runActionWithNormalizationCheck = useCallback((action: () => void) => {
    const totalInclusion = analysisResult.totalInclusion;
    if (Math.abs(100 - totalInclusion) > 0.1) {
      setPendingAction(() => action);
      setIsNormalizationModalOpen(true);
    } else {
      action();
    }
  }, [analysisResult.totalInclusion]);

  const handleNavigate = useCallback((page: Page) => {
    if (page === currentPage) return;

    const navigateAction = () => performNavigation(page);

    if (currentPage === Page.INPUT && page === Page.ANALYSIS) {
      runActionWithNormalizationCheck(navigateAction);
    } else {
      navigateAction();
    }
  }, [currentPage, runActionWithNormalizationCheck]);

  const handleNormalize = () => {
    const totalInclusion = analysisResult.totalInclusion;
    if (totalInclusion === 0) return;
    const factor = 100 / totalInclusion;
    const newIngredients = ingredients.map(ing => ({
      ...ing,
      Inclusion_pct: ing.Inclusion_pct * factor,
    }));
    setIngredients(newIngredients);
  };

  const handleModalClose = () => {
    setIsNormalizationModalOpen(false);
    setPendingAction(null);
  };

  const handleModalProceedAnyway = () => {
    if (pendingAction) {
      pendingAction();
    }
    handleModalClose();
  };

  const handleModalNormalizeAndProceed = () => {
    handleNormalize();
    setTimeout(() => {
      if (pendingAction) {
        pendingAction();
      }
    }, 100);
    handleModalClose();
  };
  
  const handleProceedToInput = useCallback((selectedIngredientIds: number[]) => {
      const selectedMasterIngredients = masterIngredients.filter(ing => selectedIngredientIds.includes(ing.id));
      const newRecipeIngredients = selectedMasterIngredients.map(masterIng => {
          const existingIng = ingredients.find(i => i.id === masterIng.id);
          return existingIng || { ...masterIng, Inclusion_pct: 0 };
      });
      setIngredients(newRecipeIngredients);
      handleNavigate(Page.INPUT);
  }, [ingredients, masterIngredients, handleNavigate]);
  
  const handleAddMasterIngredient = useCallback((newIngredient: Ingredient) => {
    setMasterIngredients(prev => [...prev, { ...newIngredient, id: Date.now() }]);
  }, []);

  const handleUpdateMasterIngredient = useCallback((updatedIngredient: Ingredient) => {
    setMasterIngredients(prev => 
      prev.map(ing => (ing.id === updatedIngredient.id ? updatedIngredient : ing))
    );
  }, []);

  const handleResetMasterIngredients = useCallback(() => {
    setMasterIngredients(initialIngredients);
    alert('Restored default ingredient database.');
  }, []);

  const handleMergeMasterIngredients = useCallback((importedIngredients: Ingredient[]) => {
    if (!importedIngredients || importedIngredients.length === 0) {
      alert('No valid ingredients found in the file.');
      return;
    }

    setMasterIngredients(prevMasterIngredients => {
      const newMasterIngredients = [...prevMasterIngredients];
      const existingIngredientsMap = new Map(newMasterIngredients.map(ing => [ing.Name.toLowerCase().trim(), ing]));
      
      let updatedCount = 0;
      let addedCount = 0;

      importedIngredients.forEach(importedIng => {
        if (!importedIng || typeof importedIng.Name !== 'string') {
          return;
        }

        const existingIng = existingIngredientsMap.get(importedIng.Name.toLowerCase().trim());
        
        if (existingIng) {
          const updatedIng = { ...existingIng, ...importedIng, id: existingIng.id };
          const index = newMasterIngredients.findIndex(ing => ing.id === existingIng.id);
          if (index !== -1) {
            newMasterIngredients[index] = updatedIng;
            updatedCount++;
          }
        } else {
          newMasterIngredients.push({
            ...importedIng,
            id: Date.now() + Math.random(),
          });
          addedCount++;
        }
      });
      
      alert(`Import complete. ${updatedCount} ingredients updated, ${addedCount} new ingredients added.`);
      return newMasterIngredients;
    });
  }, []);

  const handleUpdateIngredient = useCallback((index: number, field: keyof Ingredient, value: number | string) => {
    setIngredients(prev => {
      const newIngredients = [...prev];
      const ingredient = { ...newIngredients[index] };
      (ingredient[field] as number | string) = value;
      newIngredients[index] = ingredient;
      return newIngredients;
    });
  }, []);
  
  const handleAddIngredient = useCallback(() => {
    const newIngredient: Ingredient = {
      id: Date.now(),
      Name: 'New Ingredient',
      description: '',
      category: 'Other',
      Inclusion_pct: 0, CP_pct: 0, ME_kcal_per_kg: 0, Ca_pct: 0, avP_pct: 0, phytateP_pct: 0, Na_pct: 0, K_pct: 0, Cl_pct: 0, Lys_pct: 0, TSAA_pct: 0, Thr_pct: 0, Val_pct: 0, Ile_pct: 0, Leu_pct: 0, Arg_pct: 0, Try_pct: 0, Starch_pct: 0, CF_pct: 0, NDF_pct: 0, ADF_pct: 0, Ash_pct: 0, Choline_mg_per_kg: 0, Price_USD_per_ton: 0,
    };
    setIngredients(prev => [...prev, newIngredient]);
  }, []);

  const handleDeleteIngredient = useCallback((id: number) => {
    setIngredients(prev => prev.filter(ing => ing.id !== id));
  }, []);

  const handleUpdateOverride = useCallback((key: string, values: { min: number; max: number } | null) => {
    setRecommendationOverrides(prev => {
      const newOverrides = { ...prev };
      if (values === null) {
        delete newOverrides[key]; // This reverts to default
      } else {
        newOverrides[key] = values;
      }
      return newOverrides;
    });
  }, []);

  const handleResetAllOverrides = useCallback(() => {
    if (window.confirm('Are you sure you want to reset all recommendations to Aviagen defaults?')) {
      setRecommendationOverrides({});
    }
  }, []);

  const handleUpdateNutrientVisibility = useCallback((newVisibility: Record<string, boolean>) => {
    setNutrientVisibility(newVisibility);
  }, []);

  const handleUpdateNutrientUnit = useCallback((key: string, unit: string) => {
    setNutrientUnits(prev => ({ ...prev, [key]: unit }));
  }, []);
  
  const renderPage = () => {
    switch(currentPage) {
      case Page.SELECTION:
        return (
          <SelectionPage 
            masterIngredients={masterIngredients}
            recipeIngredients={ingredients}
            onProceed={handleProceedToInput}
            onAddMasterIngredient={handleAddMasterIngredient}
            onUpdateMasterIngredient={handleUpdateMasterIngredient}
            onResetMasterIngredients={handleResetMasterIngredients}
            onMergeMasterIngredients={handleMergeMasterIngredients}
          />
        );
      case Page.INPUT:
        return (
          <InputPage
            ingredients={ingredients}
            setIngredients={setIngredients}
            onUpdateIngredient={handleUpdateIngredient}
            onAddIngredient={handleAddIngredient}
            onDeleteIngredient={handleDeleteIngredient}
            totalInclusion={analysisResult.totalInclusion}
            inclusionMode={inclusionMode}
            setInclusionMode={setInclusionMode}
            runActionWithNormalizationCheck={runActionWithNormalizationCheck}
          />
        );
      case Page.ANALYSIS:
        return (
          <AnalysisPage 
            results={analysisResult} 
            growthPhase={growthPhase}
            setGrowthPhase={setGrowthPhase}
            recommendationOverrides={recommendationOverrides}
            onUpdateOverride={handleUpdateOverride}
            onResetAllOverrides={handleResetAllOverrides}
            nutrientVisibility={nutrientVisibility}
            onUpdateNutrientVisibility={handleUpdateNutrientVisibility}
            nutrientUnits={nutrientUnits}
            onUpdateNutrientUnit={handleUpdateNutrientUnit}
          />
        );
      case Page.VITAMIN_PREMIX:
        return <VitaminPremixPage />;
      case Page.MINERAL_PREMIX:
        return <MineralPremixPage />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {isLoadingAnalysis && (
        <div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center z-50 no-print">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-600"></div>
            <p className="mt-4 text-lg text-gray-800 font-semibold">Calculating analysis...</p>
        </div>
      )}
      <InclusionConfirmationModal
        isOpen={isNormalizationModalOpen}
        onClose={handleModalClose}
        onNormalizeAndProceed={handleModalNormalizeAndProceed}
        onProceedAnyway={handleModalProceedAnyway}
        totalInclusion={analysisResult.totalInclusion}
      />
      <Header 
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
      <main className={`flex-grow container mx-auto p-4 sm:p-6 lg:p-8 page-container ${animationClass}`}>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
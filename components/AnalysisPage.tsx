import React, { useState, useMemo, useEffect } from 'react';
import type { MixAnalysisResult, GrowthPhase, AviagenRecommendation, RecommendationOverrides } from '../types';
import { ANALYSIS_RESULTS_EN, ROSS_308_RECOMMENDATIONS, NUTRIENT_UNITS, convertValue } from '../constants';
import NutrientVisibilityModal from './NutrientVisibilityModal';
import NutrientRadarChart from './NutrientRadarChart';

interface AnalysisPageProps {
  results: MixAnalysisResult;
  growthPhase: GrowthPhase;
  setGrowthPhase: (phase: GrowthPhase) => void;
  recommendationOverrides: RecommendationOverrides;
  onUpdateOverride: (key: string, values: { min: number; max: number } | null) => void;
  onResetAllOverrides: () => void;
  nutrientVisibility: Record<string, boolean>;
  onUpdateNutrientVisibility: (newVisibility: Record<string, boolean>) => void;
  nutrientUnits: Record<string, string>;
  onUpdateNutrientUnit: (key: string, unit: string) => void;
}

const getStatus = (value: number, min: number, max: number) => {
  const tolerance = 0.05; // 5% tolerance for yellow

  // Handle minimum-only recommendations (like Choline)
  if (max === Infinity) {
    if (value >= min) return { text: 'Meets Minimum', color: 'bg-green-100 text-green-800' };
    if (value >= min * (1 - tolerance)) return { text: 'Slightly Low', color: 'bg-yellow-100 text-yellow-800' };
    return { text: 'Below Minimum', color: 'bg-red-100 text-red-800' };
  }

  // Handle standard range recommendations
  if (value >= min && value <= max) return { text: 'Within Range', color: 'bg-green-100 text-green-800' };
  if ((value > max && value <= max * (1 + tolerance)) || (value < min && value >= min * (1 - tolerance))) return { text: 'Borderline', color: 'bg-yellow-100 text-yellow-800' };
  return { text: 'Out of Range', color: 'bg-red-100 text-red-800' };
};

const nutrientGroups = {
  'Key Performance': ['nutrients.ME_kcal_per_kg', 'nutrients.CP_pct'],
  'Major Minerals': ['nutrients.Ca_pct', 'nutrients.avP_pct', 'nutrients.CaAvP_Ratio', 'nutrients.Na_pct', 'nutrients.Ash_pct'],
  'Essential Amino Acids': ['nutrients.Lys_pct', 'nutrients.TSAA_pct', 'nutrients.Arg_pct', 'nutrients.Thr_pct', 'nutrients.Val_pct', 'nutrients.Ile_pct'],
  'Other Nutrients': ['nutrients.Choline_mg_per_kg'],
};

const ComparisonRow: React.FC<{
    nutrientKey: string;
    label: string;
    value: number; // Base unit value
    recommendation: AviagenRecommendation;
    isOverridden: boolean;
    onUpdateOverride: (key: string, values: { min: number; max: number } | null) => void;
    selectedUnit: string;
    onUpdateUnit: (key: string, unit: string) => void;
}> = ({ nutrientKey, label, value, recommendation, isOverridden, onUpdateOverride, selectedUnit, onUpdateUnit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [minVal, setMinVal] = useState(String(recommendation.min));
    const [maxVal, setMaxVal] = useState(recommendation.max === Infinity ? '' : String(recommendation.max));

    useEffect(() => {
        if (!isEditing) {
            setMinVal(String(recommendation.min));
            setMaxVal(recommendation.max === Infinity ? '' : String(recommendation.max));
        }
    }, [recommendation, isEditing]);

    const handleSave = () => {
        const min = parseFloat(minVal);
        const max = maxVal.trim() === '' ? Infinity : parseFloat(maxVal);

        if (!isNaN(min) && !isNaN(max) && min <= max) {
            onUpdateOverride(nutrientKey, { min, max });
            setIsEditing(false);
        } else {
            alert('Please enter valid numeric values and ensure Minimum is not greater than Maximum.');
        }
    };

    const handleCancel = () => {
        setMinVal(String(recommendation.min));
        setMaxVal(recommendation.max === Infinity ? '' : String(recommendation.max));
        setIsEditing(false);
    };

    const handleRevert = () => onUpdateOverride(nutrientKey, null);

    const { min, max } = recommendation;
    const deviation = value - (max === Infinity ? min : (min + max) / 2);
    const status = getStatus(value, min, max);

    const unitInfo = NUTRIENT_UNITS[nutrientKey];
    const availableUnits = unitInfo?.units;

    const { value: convertedValue } = convertValue(value, nutrientKey, selectedUnit);
    const { value: convertedMin } = convertValue(min, nutrientKey, selectedUnit);
    const { value: convertedMax } = convertValue(max, nutrientKey, selectedUnit);
    const { value: convertedDeviation } = convertValue(deviation, nutrientKey, selectedUnit);
    
    const recommendationText = convertedMax === Infinity ? `> ${convertedMin.toFixed(3)}` : `${convertedMin.toFixed(3)} - ${convertedMax.toFixed(3)}`;

    const chartData = useMemo(() => {
        if (recommendation.unit === '') return null; // Don't render chart for ratios
        
        const { min: recMin, max: recMax } = recommendation;
        const isMinOnly = recMax === Infinity;
        
        let chartMin, chartMax, scale;

        if(isMinOnly) {
            chartMin = recMin * 0.5;
            chartMax = Math.max(value, recMin) * 1.25;
        } else {
            const padding = (recMax - recMin) * 0.5;
            chartMin = Math.max(0, recMin - padding);
            chartMax = Math.max(value, recMax) + padding;
        }
        
        if (chartMax === chartMin) return null; // Avoid division by zero
        scale = chartMax - chartMin;

        const valuePercent = Math.min(100, Math.max(0, ((value - chartMin) / scale) * 100));
        const minPercent = Math.max(0, ((recMin - chartMin) / scale) * 100);
        const rangeWidth = isMinOnly ? 100 - minPercent : ((recMax - recMin) / scale) * 100;
        
        const statusColorClass = getStatus(value, recMin, recMax).color;
        let markerColor = 'bg-gray-400';
        if (statusColorClass.includes('green')) markerColor = 'bg-green-500';
        else if (statusColorClass.includes('yellow')) markerColor = 'bg-yellow-500';
        else if (statusColorClass.includes('red')) markerColor = 'bg-red-500';

        return { valuePercent, minPercent, rangeWidth, markerColor };
    }, [value, recommendation]);


    return (
        <tr className={`hover:bg-gray-50 transition-colors ${isOverridden ? 'bg-blue-50' : ''}`}>
            <td className="py-2 px-4 border-b text-left">{label}</td>
            <td className="py-2 px-4 border-b font-mono text-center">{convertedValue.toFixed(3)}</td>
            <td className="py-2 px-4 border-b font-mono text-center" style={{ minWidth: '220px' }}>
                {isEditing ? (
                    <div className="flex items-center gap-2">
                        <input type="text" inputMode="decimal" value={minVal} onChange={e => setMinVal(e.target.value)} className="w-full p-1 border rounded-md text-center" placeholder="Min" />
                        <span>-</span>
                        <input type="text" inputMode="decimal" value={maxVal} onChange={e => setMaxVal(e.target.value)} className="w-full p-1 border rounded-md text-center" placeholder="Max" />
                    </div>
                ) : (
                   <div className="flex items-center justify-center gap-2">
                        <span>{recommendationText}</span>
                        {availableUnits && Object.keys(availableUnits).length > 1 && (
                            <select 
                                value={selectedUnit} 
                                onChange={(e) => onUpdateUnit(nutrientKey, e.target.value)}
                                className="p-1 border rounded-md bg-gray-50 text-xs focus:ring-teal-500 focus:border-teal-500"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {Object.keys(availableUnits).map(unit => (
                                    <option key={unit} value={unit}>{unit || 'ratio'}</option>
                                ))}
                            </select>
                        )}
                    </div>
                )}
            </td>
            <td className="py-2 px-4 border-b font-mono text-center">
                <div className={`flex items-center justify-center gap-1 ${deviation >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                    <span>{convertedDeviation.toFixed(3)}</span>
                    {deviation > 0.0001 && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>}
                    {deviation < -0.0001 && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                </div>
            </td>
            <td className="py-2 px-4 border-b text-center">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${status.color}`}>
                    {status.text}
                </span>
            </td>
            <td className="py-2 px-4 border-b text-center no-print" style={{minWidth: '120px'}}>
                {chartData ? (
                    <div className="relative h-6 w-full flex items-center" title={`Value: ${value.toFixed(3)} | Range: ${min}-${max === Infinity ? '∞' : max}`}>
                        <div className="absolute h-2 w-full bg-gray-200 rounded-full"></div>
                        <div 
                            className="absolute h-2 bg-green-200 rounded-full"
                            style={{ left: `${chartData.minPercent}%`, width: `${chartData.rangeWidth}%` }}
                        ></div>
                        <div 
                            className={`absolute h-4 w-1 ${chartData.markerColor} rounded-full transform -translate-x-1/2 shadow`}
                            style={{ left: `${chartData.valuePercent}%` }}
                        ></div>
                    </div>
                ) : (
                    <span className="text-gray-400 text-xs">-</span>
                )}
            </td>
            <td className="py-2 px-4 border-b text-center no-print">
                <div className="flex justify-center items-center space-x-2">
                    {isEditing ? (
                        <>
                            <button onClick={handleSave} className="text-green-600 hover:text-green-800" title="Save"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></button>
                            <button onClick={handleCancel} className="text-red-600 hover:text-red-800" title="Cancel"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.697a1 1 0 010-1.414z" clipRule="evenodd" /></svg></button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => setIsEditing(true)} className="text-gray-500 hover:text-blue-700" title="Edit"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg></button>
                            {isOverridden && <button onClick={handleRevert} className="text-gray-500 hover:text-orange-700" title="Revert to Default"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" /></svg></button>}
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
};


const AnalysisPage: React.FC<AnalysisPageProps> = ({ results, growthPhase, setGrowthPhase, recommendationOverrides, onUpdateOverride, onResetAllOverrides, nutrientVisibility, onUpdateNutrientVisibility, nutrientUnits, onUpdateNutrientUnit }) => {
  const [isComparisonExpanded, setIsComparisonExpanded] = useState(true);
  const [isChartExpanded, setIsChartExpanded] = useState(true);
  const [isVisibilityModalOpen, setIsVisibilityModalOpen] = useState(false);

  const activeRecommendations = useMemo(() => {
    const defaults = ROSS_308_RECOMMENDATIONS[growthPhase];
    const merged = { ...defaults };
    // Deep copy to avoid mutating the constant
    for (const key in defaults) {
      merged[key] = { ...defaults[key] };
    }
    for (const key in recommendationOverrides) {
      if (merged[key]) {
        // Override min/max but keep unit
        merged[key] = { ...merged[key], ...recommendationOverrides[key] };
      }
    }
    return merged;
  }, [growthPhase, recommendationOverrides]);

  const getNutrientValue = (key: string): number => {
      const parts = key.split('.');
      if (parts.length === 2 && parts[0] === 'nutrients') {
          return results.nutrients[parts[1]] ?? 0;
      }
      return (results[key] as number) ?? 0;
  }

  const radarChartData = useMemo(() => {
    const chartKeys = [
        'nutrients.ME_kcal_per_kg', 
        'nutrients.CP_pct', 
        'nutrients.Lys_pct', 
        'nutrients.TSAA_pct', 
        'nutrients.Ca_pct', 
        'nutrients.avP_pct', 
        'nutrients.Na_pct'
    ];
    return chartKeys.map(key => {
        const recommendation = activeRecommendations[key];
        if (!recommendation) return null;
        return {
            label: ANALYSIS_RESULTS_EN[key]?.replace('%', '').trim() || key,
            value: getNutrientValue(key),
            min: recommendation.min,
            max: recommendation.max,
        };
    }).filter(item => item !== null) as { label: string; value: number; min: number; max: number }[];
  }, [results, activeRecommendations]);
  
  const criticalWarnings = [];
  const cholineRec = activeRecommendations['nutrients.Choline_mg_per_kg'];
  if (cholineRec && getNutrientValue('nutrients.Choline_mg_per_kg') < cholineRec.min) {
      criticalWarnings.push('Choline level is below the recommended minimum.');
  }
  const caAvpRatioRec = activeRecommendations['nutrients.CaAvP_Ratio'];
  const caAvpRatio = getNutrientValue('nutrients.CaAvP_Ratio');
  if (caAvpRatioRec && (caAvpRatio < caAvpRatioRec.min || caAvpRatio > caAvpRatioRec.max)) {
      criticalWarnings.push('Calcium to Available Phosphorus ratio is imbalanced.');
  }
  const naRec = activeRecommendations['nutrients.Na_pct'];
  const naValue = getNutrientValue('nutrients.Na_pct');
  if (naRec && (naValue < naRec.min || naValue > naRec.max)) {
      criticalWarnings.push('Sodium level is out of the recommended range.');
  }

  const visibleNutrientsForSummary = Object.keys(ANALYSIS_RESULTS_EN).filter(key => nutrientVisibility[key]);

  return (
    <>
      <div className="space-y-8" id="report-content">
        <div className="print-only text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Feed Analysis Report</h1>
            <p className="text-gray-600">Report Date: {new Date().toLocaleDateString('en-US')}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Feed Analysis Summary</h2>
          {visibleNutrientsForSummary.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {visibleNutrientsForSummary.map(key => {
                const selectedUnit = nutrientUnits[key] || NUTRIENT_UNITS[key]?.baseUnit;
                const baseValue = getNutrientValue(key);
                const { value: convertedValue, unit: displayUnit } = convertValue(baseValue, key, selectedUnit);
                
                return (
                  <div key={key} className="bg-gray-50 p-4 rounded-md text-center">
                    <p className="text-sm text-gray-500">{ANALYSIS_RESULTS_EN[key]}</p>
                    <p className="text-xl font-bold text-teal-600">{convertedValue.toFixed(2)} <span className="text-sm font-normal text-gray-500">{displayUnit}</span></p>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">No items selected for display. Please adjust the display settings.</p>
          )}
        </div>
        
        {criticalWarnings.length > 0 && (
          <div className="bg-red-50 p-6 rounded-lg shadow-lg border-2 border-red-500" role="alert">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
              </div>
              <div className="ml-4">
                  <h3 className="text-xl font-bold text-red-800">Important Warnings</h3>
                  <p className="text-red-700 mt-1">Critical issues were detected in the mix that may affect bird performance:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-red-900 font-medium">
                      {criticalWarnings.map((warn, i) => <li key={i}>{warn}</li>)}
                  </ul>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden no-print">
            <button
                onClick={() => setIsChartExpanded(!isChartExpanded)}
                className="w-full flex justify-between items-center p-4 text-left focus:outline-none hover:bg-gray-50 focus:bg-gray-100 transition-colors"
                aria-expanded={isChartExpanded}
                aria-controls="chart-content"
            >
                <h2 className="text-2xl font-bold text-gray-700">Nutrient Balance Radar Chart</h2>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-gray-500 transform transition-transform ${isChartExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isChartExpanded && (
                <div id="chart-content" className="p-6 border-t border-gray-200">
                    <p className="text-center text-gray-600 mb-4">This chart provides a visual representation of the formulated feed against the recommended nutrient ranges. The <span className="font-bold text-green-600">green area</span> is the target range, and the <span className="font-bold text-blue-600">blue line</span> is your feed.</p>
                    <NutrientRadarChart data={radarChartData} size={500} />
                </div>
            )}
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <button
            onClick={() => setIsComparisonExpanded(!isComparisonExpanded)}
            className="w-full flex justify-between items-center p-4 text-left focus:outline-none hover:bg-gray-50 focus:bg-gray-100 transition-colors"
            aria-expanded={isComparisonExpanded}
            aria-controls="comparison-content"
          >
            <h2 className="text-2xl font-bold text-gray-700">Detailed Comparison with Aviagen Ross 308 Recommendations</h2>
            <div className="flex items-center">
              <div className="no-print flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => window.print()} className="bg-teal-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-700 transition-colors text-sm">
                    Print Report
                </button>
                <button onClick={() => setIsVisibilityModalOpen(true)} className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors text-sm">
                    Customize View
                </button>
                <button onClick={onResetAllOverrides} className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors text-sm">
                    Restore Defaults
                </button>
                <select
                  value={growthPhase}
                  onChange={(e) => setGrowthPhase(e.target.value as GrowthPhase)}
                  className="p-2 border border-gray-300 rounded-md bg-white"
                >
                  <option value="Starter">Starter (0-10d)</option>
                  <option value="Grower">Grower (11-24d)</option>
                  <option value="Finisher 1">Finisher 1 (25-39d)</option>
                  <option value="Finisher 2">Finisher 2 (40d+)</option>
                </select>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-gray-500 transform transition-transform ml-4 no-print ${isComparisonExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          {isComparisonExpanded && (
            <div id="comparison-content" className="p-6 border-t border-gray-200">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 border-b text-left font-semibold">Nutrient</th>
                      <th className="py-2 px-4 border-b text-center font-semibold">Feed Value</th>
                      <th className="py-2 px-4 border-b text-center font-semibold">Recommendation / Unit</th>
                      <th className="py-2 px-4 border-b text-center font-semibold">Deviation</th>
                      <th className="py-2 px-4 border-b text-center font-semibold">Status</th>
                      <th className="py-2 px-4 border-b text-center font-semibold no-print">Visualization</th>
                      <th className="py-2 px-4 border-b text-center font-semibold no-print">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(nutrientGroups).map(([groupName, keys]) => {
                      const visibleKeys = keys.filter(key => nutrientVisibility[key] && activeRecommendations[key]);
                      if (visibleKeys.length === 0) return null;

                      return (
                          <React.Fragment key={groupName}>
                          <tr>
                              <th colSpan={7} className="bg-teal-50 text-teal-800 text-left font-bold py-2 px-4 border-b border-t">
                              {groupName}
                              </th>
                          </tr>
                          {visibleKeys.map(key => {
                              const rec = activeRecommendations[key];
                              if (!rec) return null;
                              const isOverridden = Object.prototype.hasOwnProperty.call(recommendationOverrides, key);
                              const selectedUnit = nutrientUnits[key] || NUTRIENT_UNITS[key]?.baseUnit;
                              return (
                                  <ComparisonRow
                                      key={key}
                                      nutrientKey={key}
                                      label={ANALYSIS_RESULTS_EN[key] || key}
                                      value={getNutrientValue(key)}
                                      recommendation={rec}
                                      isOverridden={isOverridden}
                                      onUpdateOverride={onUpdateOverride}
                                      selectedUnit={selectedUnit}
                                      onUpdateUnit={onUpdateNutrientUnit}
                                  />
                              );
                          })}
                          </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        {isVisibilityModalOpen && (
          <NutrientVisibilityModal
              isOpen={isVisibilityModalOpen}
              onClose={() => setIsVisibilityModalOpen(false)}
              currentVisibility={nutrientVisibility}
              onSave={onUpdateNutrientVisibility}
          />
        )}
      </div>
    </>
  );
};

export default AnalysisPage;
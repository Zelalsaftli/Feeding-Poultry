import React, { useState } from 'react';
import type { Ingredient } from '../types';
import EnzymeMatrixModal from './EnzymeMatrixModal';

interface EnzymeManagerProps {
    enzymes: Ingredient[];
    onUpdateEnzyme: (enzyme: Ingredient) => void;
}

const EnzymeManager: React.FC<EnzymeManagerProps> = ({ enzymes, onUpdateEnzyme }) => {
    const [editingEnzyme, setEditingEnzyme] = useState<Ingredient | null>(null);

    const handleDosageChange = (enzyme: Ingredient, value: string) => {
        const numericValue = parseFloat(value);
        onUpdateEnzyme({ ...enzyme, standard_dosage_g_per_ton: isNaN(numericValue) ? 0 : numericValue });
    };
    
    const handleSaveMatrix = (updatedEnzyme: Ingredient) => {
        onUpdateEnzyme(updatedEnzyme);
        setEditingEnzyme(null);
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-700">Enzyme Management</h2>
            </div>
            <div className="space-y-4">
                {enzymes.map(enzyme => (
                    <div key={enzyme.id} className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 p-3 bg-gray-50 rounded-md border">
                        <div className="md:col-span-1">
                             <label htmlFor={`enzyme-name-${enzyme.id}`} className="text-lg font-medium text-gray-800">
                                {enzyme.Name}
                            </label>
                        </div>

                        <div className="md:col-span-1 flex items-center">
                             <label htmlFor={`enzyme-dosage-${enzyme.id}`} className="text-sm font-medium text-gray-600 mr-2 whitespace-nowrap">Dosage (g/ton):</label>
                             <input
                                type="text"
                                inputMode="decimal"
                                id={`enzyme-dosage-${enzyme.id}`}
                                value={enzyme.standard_dosage_g_per_ton || 0}
                                onChange={(e) => handleDosageChange(enzyme, e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                            />
                        </div>
                       
                        <div className="md:col-span-1 flex items-center justify-end space-x-3">
                            <button
                                onClick={() => setEditingEnzyme(enzyme)}
                                className="text-teal-600 hover:text-teal-800 font-semibold text-sm"
                            >
                                Edit Matrix
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {editingEnzyme && (
                <EnzymeMatrixModal 
                    ingredient={editingEnzyme}
                    onSave={handleSaveMatrix}
                    onClose={() => setEditingEnzyme(null)}
                />
            )}
        </div>
    );
};

export default EnzymeManager;
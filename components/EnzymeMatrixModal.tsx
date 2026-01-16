import React, { useState, useEffect } from 'react';
import type { Enzyme, Ingredient } from '../types';
import { COLUMN_HEADERS_EN } from '../constants';

interface EnzymeMatrixModalProps {
  enzyme: Enzyme;
  onSave: (updatedEnzyme: Enzyme) => void;
  onClose: () => void;
}

// State will hold only strings for easier editing
type MatrixState = Partial<Record<keyof Omit<Ingredient, 'id' | 'Name' | 'Inclusion_pct' | 'Price_USD_per_ton' | 'description' | 'category'>, string>>;

// Helper to create stringified state from the enzyme matrix
const createStringifiedMatrix = (matrix: Enzyme['matrix']): MatrixState => {
    return Object.entries(matrix).reduce((acc, [key, value]) => {
        acc[key as keyof MatrixState] = String(value);
        return acc;
    }, {} as MatrixState);
};


const EnzymeMatrixModal: React.FC<EnzymeMatrixModalProps> = ({ enzyme, onSave, onClose }) => {
  const [editedName, setEditedName] = useState(enzyme.name);
  const [standardDosage, setStandardDosage] = useState(String(enzyme.standard_dosage_g_per_ton));
  const [price, setPrice] = useState(String(enzyme.Price_USD_per_ton || 0));
  const [matrixState, setMatrixState] = useState<MatrixState>(createStringifiedMatrix(enzyme.matrix));

  useEffect(() => {
    setEditedName(enzyme.name);
    setStandardDosage(String(enzyme.standard_dosage_g_per_ton));
    setPrice(String(enzyme.Price_USD_per_ton || 0));
    setMatrixState(createStringifiedMatrix(enzyme.matrix));
  }, [enzyme]);

  // Just store the raw string value from the input
  const handleChange = (field: keyof MatrixState, value: string) => {
    setMatrixState(prev => ({ 
        ...prev, 
        [field]: value 
    }));
  };

  const handleSave = () => {
    // Parse strings back to numbers on save
    const cleanedMatrix = Object.entries(matrixState).reduce((acc, [key, value]) => {
        if (typeof value === 'string' && value.trim() !== '') {
            const numericValue = parseFloat(value);
            if (!isNaN(numericValue)) {
                acc[key as keyof Enzyme['matrix']] = numericValue;
            }
        }
        return acc;
    }, {} as Enzyme['matrix']);

    let numericStandardDosage = parseFloat(standardDosage);
    if(isNaN(numericStandardDosage) || numericStandardDosage <= 0) {
        numericStandardDosage = 100; // Fallback to a safe default
    }

    let numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
        numericPrice = 0;
    }

    onSave({ 
        ...enzyme, 
        name: editedName, 
        standard_dosage_g_per_ton: numericStandardDosage,
        Price_USD_per_ton: numericPrice,
        matrix: cleanedMatrix 
    });
  };
  
  const nutrientFields = Object.keys(COLUMN_HEADERS_EN).filter(
      key => !['id', 'Name', 'Inclusion_pct', 'Price_USD_per_ton', 'description', 'category'].includes(key)
  ) as (keyof MatrixState)[];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 no-print" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 m-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-2xl font-bold text-gray-800">Edit Enzyme: {enzyme.name}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-3xl">&times;</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 mb-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Enzyme Name</label>
                <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                />
            </div>
             <div>
                 <label className="block text-sm font-medium text-gray-700">Standard Dosage (g/ton)</label>
                 <input
                    type="text"
                    inputMode="decimal"
                    value={standardDosage}
                    onChange={(e) => setStandardDosage(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                />
            </div>
            <div>
                 <label className="block text-sm font-medium text-gray-700">Price ($/ton)</label>
                 <input
                    type="text"
                    inputMode="decimal"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                />
            </div>
        </div>

        <div className="border-t my-4"></div>
        
        <p className="text-sm text-gray-600 mb-4 bg-gray-100 p-3 rounded-md">
          <b>Instructions:</b> Enter the nutrient values the enzyme adds when using the <b>Standard Dosage</b> specified above. The application will calculate the actual contribution based on the dosage you set on the main input screen.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            {nutrientFields.map(field => {
                 const value = matrixState[field] ?? '';
                 const hasValue = value !== '' && parseFloat(String(value)) !== 0;
                 return (
                     <div key={field}>
                         <label className="block text-sm font-medium text-gray-700">{COLUMN_HEADERS_EN[field as keyof typeof COLUMN_HEADERS_EN]}</label>
                         <input
                            type="text"
                            inputMode="decimal"
                            value={value}
                            onChange={(e) => handleChange(field, e.target.value)}
                            placeholder="0.00"
                            className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 transition-colors ${
                                hasValue ? 'bg-teal-50 border-teal-400' : 'border-gray-300'
                            }`}
                        />
                     </div>
                 );
            })}
        </div>

        <div className="mt-6 pt-4 border-t flex justify-end space-x-3">
          <button onClick={onClose} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-300">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-teal-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnzymeMatrixModal;
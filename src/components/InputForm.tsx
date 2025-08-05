
import React from 'react';
import type { FormData } from '../types';
import SliderInput from './SliderInput';
import ImageUpload from './ImageUpload';
import { LeafIcon, CloudIcon, SoilIcon, ArrowRightIcon } from './Icons';

interface InputFormProps {
  formData: FormData;
  onFormChange: (field: keyof FormData, value: any) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ formData, onFormChange, onSubmit, isLoading }) => {
  const CROP_OPTIONS = ['Corn', 'Wheat', 'Soybeans', 'Rice', 'Canola', 'Potatoes'];

  return (
    <div className="space-y-8">
      {/* Crop Selection */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="font-semibold text-lg flex items-center mb-4 text-gray-700"><LeafIcon className="w-6 h-6 mr-3 text-green-500"/>Crop Selection</h3>
        <select
          id="cropType"
          value={formData.cropType}
          onChange={(e) => onFormChange('cropType', e.target.value)}
          className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
        >
          {CROP_OPTIONS.map(crop => <option key={crop} value={crop}>{crop}</option>)}
        </select>
      </div>

      {/* Satellite Image Upload */}
       <ImageUpload 
          image={formData.satelliteImage}
          onImageChange={(img) => onFormChange('satelliteImage', img)}
        />
        
      {/* Weather Conditions */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="font-semibold text-lg flex items-center mb-4 text-gray-700"><CloudIcon className="w-6 h-6 mr-3 text-blue-500"/>Weather Conditions</h3>
        <div className="space-y-5">
          <SliderInput label="Average Temperature" unit="°C" min={-10} max={40} step={1} value={formData.temperature} onChange={(val) => onFormChange('temperature', val)} />
          <SliderInput label="Total Rainfall" unit="mm" min={100} max={2000} step={10} value={formData.rainfall} onChange={(val) => onFormChange('rainfall', val)} />
          <SliderInput label="Sunshine Hours" unit="hrs/day" min={2} max={14} step={0.5} value={formData.sunshine} onChange={(val) => onFormChange('sunshine', val)} />
        </div>
      </div>

      {/* Soil Analysis */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="font-semibold text-lg flex items-center mb-4 text-gray-700"><SoilIcon className="w-6 h-6 mr-3 text-yellow-700"/>Soil Analysis</h3>
        <div className="space-y-5">
          <SliderInput label="Nitrogen (N)" unit="ppm" min={20} max={300} step={5} value={formData.nitrogen} onChange={(val) => onFormChange('nitrogen', val)} />
          <SliderInput label="Phosphorus (P)" unit="ppm" min={10} max={100} step={2} value={formData.phosphorus} onChange={(val) => onFormChange('phosphorus', val)} />
          <SliderInput label="Potassium (K)" unit="ppm" min={20} max={150} step={5} value={formData.potassium} onChange={(val) => onFormChange('potassium', val)} />
          <SliderInput label="Soil pH" unit="" min={4} max={9} step={0.1} value={formData.ph} onChange={(val) => onFormChange('ph', val)} />
        </div>
      </div>
      
      <button 
        onClick={onSubmit}
        disabled={isLoading || !formData.satelliteImage}
        className="w-full flex items-center justify-center bg-green-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
      >
        {isLoading ? 'Analyzing...' : 'Generate Forecast'}
        {!isLoading && <ArrowRightIcon className="w-5 h-5 ml-2" />}
      </button>
    </div>
  );
};

export default InputForm;


import React from 'react';
import type { PredictionData } from '../types';
import { CheckCircleIcon, XCircleIcon } from './Icons';

interface PredictionResultProps {
  data: PredictionData;
}

const PredictionResult: React.FC<PredictionResultProps> = ({ data }) => {
  const confidenceColor =
    data.confidenceScore > 80 ? 'bg-green-500' : data.confidenceScore > 60 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="w-full animate-fade-in space-y-6">
      <div className="text-center">
        <p className="text-gray-500 font-medium">Predicted Yield</p>
        <p className="text-6xl font-bold text-green-600">
          {data.predictedYield.toFixed(2)}
        </p>
        <p className="text-gray-500 font-medium">{data.yieldUnit}</p>
      </div>
      
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-base font-medium text-gray-700">Confidence Score</span>
          <span className="text-sm font-medium text-gray-700">{data.confidenceScore}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className={`${confidenceColor} h-2.5 rounded-full`} style={{ width: `${data.confidenceScore}%` }}></div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">AI Summary</h4>
        <p className="text-sm text-gray-600">{data.summary}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="bg-green-50 p-4 rounded-lg">
          <h5 className="font-semibold text-green-800 flex items-center mb-2">
            <CheckCircleIcon className="w-5 h-5 mr-2"/> Positive Factors
          </h5>
          <ul className="space-y-1 list-inside text-green-700">
            {data.positiveFactors.map((factor, index) => <li key={index}>- {factor}</li>)}
          </ul>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <h5 className="font-semibold text-red-800 flex items-center mb-2">
            <XCircleIcon className="w-5 h-5 mr-2"/> Negative Factors
          </h5>
          <ul className="space-y-1 list-inside text-red-700">
            {data.negativeFactors.map((factor, index) => <li key={index}>- {factor}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PredictionResult;

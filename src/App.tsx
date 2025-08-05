
import React, { useState, useCallback } from 'react';
import type { FormData, PredictionData } from './types';
import Header from './components/Header';
import InputForm from './components/InputForm';
import PredictionResult from './components/PredictionResult';
import Loader from './components/Loader';
import Footer from './components/Footer';
import { getYieldPrediction } from './services/geminiService';

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    cropType: 'Corn',
    satelliteImage: null,
    temperature: 22,
    rainfall: 600,
    sunshine: 8,
    nitrogen: 150,
    phosphorus: 50,
    potassium: 70,
    ph: 6.5,
  });
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormChange = useCallback((field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = async () => {
    if (!formData.satelliteImage) {
      setError('Please upload a satellite image to proceed.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const result = await getYieldPrediction(formData);
      setPrediction(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 font-sans text-gray-800 flex flex-col">
      <Header />
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:pr-4">
             <h2 className="text-2xl font-bold text-gray-700 mb-4">Input Parameters</h2>
             <p className="text-gray-600 mb-6">Provide the following data to generate a crop yield forecast. The more accurate the data, the better the prediction.</p>
            <InputForm 
              formData={formData} 
              onFormChange={handleFormChange} 
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
          
          <div className="lg:pl-4">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">AI Forecast</h2>
             <div className="bg-white rounded-xl shadow-lg p-6 min-h-[300px] flex flex-col justify-center items-center">
                {isLoading && <Loader />}
                {error && <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Error Generating Forecast</h3>
                  <p>{error}</p>
                </div>}
                {!isLoading && !error && prediction && <PredictionResult data={prediction} />}
                {!isLoading && !error && !prediction && (
                    <div className="text-center text-gray-500">
                        <div className="text-5xl mb-4">🤖</div>
                        <h3 className="text-xl font-semibold">Ready to Predict</h3>
                        <p className="mt-2">Your crop yield forecast will appear here once you submit the data.</p>
                    </div>
                )}
             </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import type { FormData, PredictionData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generatePromptParts = (data: FormData) => {
    if (!data.satelliteImage) {
        throw new Error("Satellite image is required for prediction.");
    }
    
    const textPrompt = `
      Analyze the following agricultural data and predict the crop yield. Your analysis should be insightful and directly related to the provided data. The confidence score should reflect how ideal the conditions are for the given crop.

      **Data for Analysis:**
      - Crop Type: ${data.cropType}
      - Satellite Image Analysis: You are provided with a satellite image of the field. Analyze it for greenness (NDVI proxy), uniformity, and signs of stress or disease. Assume the image is from the mid-growth stage.
      - Historical Weather Data:
        - Average Temperature: ${data.temperature}°C
        - Total Rainfall (growing season): ${data.rainfall}mm
        - Daily Sunshine Hours: ${data.sunshine} hours
      - Soil Condition Analysis:
        - Nitrogen (N): ${data.nitrogen} ppm
        - Phosphorus (P): ${data.phosphorus} ppm
        - Potassium (K): ${data.potassium} ppm
        - Soil pH: ${data.ph}
    `;

    const textPart = {
        text: textPrompt
    };

    const imagePart = {
        inlineData: {
            mimeType: data.satelliteImage.mimeType,
            data: data.satelliteImage.base64,
        },
    };

    return [textPart, imagePart];
};


export const getYieldPrediction = async (formData: FormData): Promise<PredictionData> => {
    try {
        if (!formData.satelliteImage) {
            throw new Error("Satellite image data is missing.");
        }

        const promptParts = generatePromptParts(formData);
        
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts: promptParts },
            config: {
                systemInstruction: "You are an advanced agricultural AI expert system for crop yield prediction. Your purpose is to forecast crop yield based on provided data, returning your prediction in a strict JSON format.",
                responseMimeType: "application/json",
                temperature: 0.2,
                responseSchema: {
                  type: Type.OBJECT,
                  properties: {
                    predictedYield: { 
                      type: Type.NUMBER,
                      description: 'The predicted crop yield in tons per hectare.'
                    },
                    yieldUnit: { 
                      type: Type.STRING,
                      description: 'The unit for the predicted yield, must be "tons/hectare".'
                    },
                    confidenceScore: { 
                      type: Type.NUMBER,
                      description: 'A score from 0 to 100 indicating the confidence in the prediction based on data quality and conditions.'
                    },
                    summary: { 
                      type: Type.STRING,
                      description: 'A brief summary of the analysis and key findings.'
                    },
                    positiveFactors: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: 'A list of factors that are positively impacting the predicted yield.'
                    },
                    negativeFactors: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: 'A list of factors that are negatively impacting the predicted yield.'
                    },
                  },
                  required: ["predictedYield", "yieldUnit", "confidenceScore", "summary", "positiveFactors", "negativeFactors"],
                }
            },
        });
        
        const parsedData: PredictionData = JSON.parse(response.text);
        return parsedData;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
           throw new Error(`Failed to get prediction from AI: ${error.message}`);
        }
        throw new Error("Failed to get prediction from AI. The model may have returned an invalid response.");
    }
};

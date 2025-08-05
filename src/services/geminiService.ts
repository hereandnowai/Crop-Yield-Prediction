import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/genai";
import type { FormData, PredictionData } from '../types';

if (!import.meta.env.VITE_GEMINI_API_KEY) {
    throw new Error("VITE_GEMINI_API_KEY environment variable not set");
}

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
        
        const result = await model.generateContent({ 
            contents: [{ parts: promptParts }],
            generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.2,
            },
            safetySettings: [
                {
                    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                    threshold: HarmBlockThreshold.BLOCK_NONE,
                },
            ],
        });
        
        const parsedData: PredictionData = JSON.parse(result.response.text());
        return parsedData;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
           throw new Error(`Failed to get prediction from AI: ${error.message}`);
        }
        throw new Error("Failed to get prediction from AI. The model may have returned an invalid response.");
    }
};


export interface FormData {
  cropType: string;
  satelliteImage: {
    base64: string;
    mimeType: string;
  } | null;
  temperature: number;
  rainfall: number;
  sunshine: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
}

export interface PredictionData {
  predictedYield: number;
  yieldUnit: string;
  confidenceScore: number;
  summary: string;
  positiveFactors: string[];
  negativeFactors: string[];
}

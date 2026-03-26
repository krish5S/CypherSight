// Centralized API client for communicating with the Python backend

export const API_BASE_URL = 'http://localhost:8000';

export interface PhishingResponse {
  risk_score: number;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
  model_confidence: number;
  signals_detected: string[];
  signal_count: number;
  explanation: string;
}

export interface UrlResponse {
  risk_score: number;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
  domain: string;
  domain_age_days: number | null;
  redirect_count: number;
  final_url: string;
  flags: string[];
  explanation: string;
}

export interface DeepfakeResponse {
  risk_score: number;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
  signals: {
    exif: { score: number; flags: string[] };
    ela: { score: number; flags: string[] };
    noise: { score: number; flags: string[] };
    color: { score: number; flags: string[] };
  };
  explanation: string;
}

export const api = {
  analyzePhishing: async (content: string): Promise<PhishingResponse> => {
    const response = await fetch(`${API_BASE_URL}/analyze/phishing`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    if (!response.ok) throw new Error('Phishing analysis failed');
    return response.json();
  },

  analyzeUrl: async (url: string): Promise<UrlResponse> => {
    const response = await fetch(`${API_BASE_URL}/analyze/url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    if (!response.ok) throw new Error('URL analysis failed');
    return response.json();
  },

  analyzeDeepfake: async (file: File): Promise<DeepfakeResponse> => {
    // Convert file to base64
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const response = await fetch(`${API_BASE_URL}/analyze/deepfake`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ media_reference: base64 }),
    });
    if (!response.ok) throw new Error('Deepfake analysis failed');
    return response.json();
  }
};

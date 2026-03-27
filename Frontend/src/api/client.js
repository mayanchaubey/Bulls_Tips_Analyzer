import axios from 'axios';
import { demoChatResponse, demoSuggestions } from '../data/demoResponses';
import { demoSignals } from '../data/demoSignals';
import { demoVerifyResult } from '../data/demoClaims';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  timeout: 5000,
});

export const isDemoMode = (error) => {
  return error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED' || (error.response && error.response.status >= 500);
};

export const chatApi = {
  sendMessage: async (message, history) => {
    try {
      const response = await apiClient.post('/api/chat', { message, history });
      return { data: response.data, isDemo: false };
    } catch (error) {
      if (isDemoMode(error)) return { data: demoChatResponse, isDemo: true };
      throw error;
    }
  },
  getSuggestions: async () => {
    try {
      const response = await apiClient.get('/api/chat/suggestions');
      return { data: response.data, isDemo: false };
    } catch (error) {
      if (isDemoMode(error)) return { data: demoSuggestions, isDemo: true };
      throw error;
    }
  }
};

export const radarApi = {
  getSignals: async () => {
    try {
      const response = await apiClient.get('/api/radar/signals');
      return { data: response.data, isDemo: false };
    } catch (error) {
      if (isDemoMode(error)) return { data: demoSignals, isDemo: true };
      throw error;
    }
  }
};

export const factcheckApi = {
  verifyVideo: async (youtube_url) => {
    try {
      const response = await apiClient.post('/api/factcheck/verify', { youtube_url });
      return { data: response.data, isDemo: false };
    } catch (error) {
      if (isDemoMode(error)) return { data: demoVerifyResult, isDemo: true };
      throw error;
    }
  }
};

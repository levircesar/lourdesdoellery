export const API_CONFIG = {
  BASE_URL: (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001/api',
  TIMEOUT: 10000, // 10 segundos
  USE_MOCK_FALLBACK: (import.meta as any).env?.VITE_USE_MOCK_FALLBACK === 'true' || false,
};

export const isApiAvailable = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
    });
    return response.ok;
  } catch (error) {
    console.warn('API não disponível, usando dados mockados:', error);
    return false;
  }
}; 
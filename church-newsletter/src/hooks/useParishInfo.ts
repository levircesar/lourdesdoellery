import { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { ParishInfo } from '../types';
import { mockParishInfo } from '../data/mockData';

const API_BASE_URL = 'http://localhost:3001/api';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: any;
}

export const useParishInfo = () => {
  const [parishInfo, setParishInfo] = useState<ParishInfo[]>([]); // sempre array vazio
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    
    axios.get(`${API_BASE_URL}/parish-info`, {
      timeout: 30000,
      signal: controller.signal
    })
      .then((res: AxiosResponse<ApiResponse<ParishInfo[]>>) => {
        const data = Array.isArray(res.data.data) ? res.data.data : [];
        // Filtrar apenas informações ativas
        const activeParishInfo = data.filter(info => info.is_active);
        setParishInfo(activeParishInfo);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        console.warn('API unavailable, using mock data:', err.message);
        const mockData = Array.isArray(mockParishInfo) ? mockParishInfo : [];
        // Filtrar apenas informações ativas dos dados mock
        const activeParishInfo = mockData.filter(info => info.is_active);
        setParishInfo(activeParishInfo);
        setLoading(false);
        setError('API unavailable, using mock data');
      });

    return () => controller.abort();
  }, []);

  return { parishInfo, loading, error };
}; 
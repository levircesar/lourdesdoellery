import { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { MassSchedule } from '../types';
import { mockMassSchedule } from '../data/mockData';

const API_BASE_URL = 'http://localhost:3001/api';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: any;
}

export const useMassSchedule = () => {
  const [massSchedules, setMassSchedules] = useState<MassSchedule[]>([]); // sempre array vazio
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    
    axios.get(`${API_BASE_URL}/mass-schedule`, {
      timeout: 30000,
      signal: controller.signal
    })
      .then((res: AxiosResponse<ApiResponse<MassSchedule[]>>) => {
        const data = Array.isArray(res.data.data) ? res.data.data : [];
        // Filtrar apenas horários ativos
        const activeSchedules = data.filter(schedule => schedule.is_active);
        setMassSchedules(activeSchedules);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        console.warn('API unavailable, using mock data:', err.message);
        const mockData = Array.isArray(mockMassSchedule) ? mockMassSchedule : [];
        // Filtrar apenas horários ativos dos dados mock
        const activeSchedules = mockData.filter(schedule => schedule.is_active);
        setMassSchedules(activeSchedules);
        setLoading(false);
        setError('API unavailable, using mock data');
      });

    return () => controller.abort();
  }, []);

  return { massSchedules, loading, error };
}; 
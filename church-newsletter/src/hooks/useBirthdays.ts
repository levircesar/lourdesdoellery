import { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { mockBirthdays } from '../data/mockData';
import { Birthday } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: any;
}

export const useBirthdays = () => {
  const [birthdays, setBirthdays] = useState<Birthday[]>([]); // sempre array vazio
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    
    axios.get(`${API_BASE_URL}/birthdays`, {
      timeout: 30000,
      signal: controller.signal
    })
      .then((res: AxiosResponse<ApiResponse<Birthday[]>>) => {
        const data = Array.isArray(res.data.data) ? res.data.data : [];
        // Filtrar apenas aniversariantes ativos e do mês atual
        const currentMonth = new Date().getMonth() + 1; // getMonth() retorna 0-11
        const activeBirthdays = data.filter(birthday => {
          if (!birthday.is_active) return false;
          const birthMonth = new Date(birthday.birth_date).getMonth() + 1;
          return birthMonth === currentMonth;
        });
        setBirthdays(activeBirthdays);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        console.warn('API unavailable, using mock data:', err.message);
        const mockData = Array.isArray(mockBirthdays) ? mockBirthdays : [];
        // Filtrar apenas aniversariantes ativos e do mês atual dos dados mock
        const currentMonth = new Date().getMonth() + 1;
        const activeBirthdays = mockData.filter(birthday => {
          if (!birthday.is_active) return false;
          const birthMonth = new Date(birthday.birth_date).getMonth() + 1;
          return birthMonth === currentMonth;
        });
        setBirthdays(activeBirthdays);
        setLoading(false);
        setError('API unavailable, using mock data');
      });

    return () => controller.abort();
  }, []);

  return { birthdays, loading, error };
}; 
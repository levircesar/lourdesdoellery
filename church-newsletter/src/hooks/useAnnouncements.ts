import { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { Announcement } from '../types';
import { mockAnnouncements } from '../data/mockData';

const API_BASE_URL = 'http://localhost:3001/api';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: any;
}

export const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]); // sempre array vazio
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    
    axios.get(`${API_BASE_URL}/announcements`, {
      timeout: 30000,
      signal: controller.signal
    })
      .then((res: AxiosResponse<ApiResponse<Announcement[]>>) => {
        const data = Array.isArray(res.data.data) ? res.data.data : [];
        // Filtrar apenas avisos ativos
        const activeAnnouncements = data.filter(announcement => announcement.is_active);
        setAnnouncements(activeAnnouncements);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        console.warn('API unavailable, using mock data:', err.message);
        const mockData = Array.isArray(mockAnnouncements) ? mockAnnouncements : [];
        // Filtrar apenas avisos ativos dos dados mock
        const activeAnnouncements = mockData.filter(announcement => announcement.is_active);
        setAnnouncements(activeAnnouncements);
        setLoading(false);
        setError('API unavailable, using mock data');
      });

    return () => controller.abort();
  }, []);

  return { announcements, loading, error };
}; 
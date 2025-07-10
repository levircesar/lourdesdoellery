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
        // Filtrar apenas avisos ativos e dentro do período válido
        const now = new Date();
        // Resetar horas para comparar apenas a data
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        console.log('Data atual:', today.toISOString());
        
        const activeAnnouncements = data.filter(announcement => {
          if (!announcement.is_active) return false;
          
          const startDate = new Date(announcement.week_start);
          const endDate = new Date(announcement.week_end);
          
          // Resetar horas para comparar apenas a data
          const startDateOnly = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
          const endDateOnly = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
          
          console.log(`Aviso "${announcement.title}":`, {
            startDate: startDateOnly.toISOString(),
            endDate: endDateOnly.toISOString(),
            isInRange: today >= startDateOnly && today <= endDateOnly
          });
          
          return today >= startDateOnly && today <= endDateOnly;
        });
        setAnnouncements(activeAnnouncements);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        console.warn('API unavailable, using mock data:', err.message);
        const mockData = Array.isArray(mockAnnouncements) ? mockAnnouncements : [];
        // Filtrar apenas avisos ativos e dentro do período válido dos dados mock
        const now = new Date();
        // Resetar horas para comparar apenas a data
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        console.log('Data atual (mock):', today.toISOString());
        
        const activeAnnouncements = mockData.filter(announcement => {
          if (!announcement.is_active) return false;
          
          const startDate = new Date(announcement.week_start);
          const endDate = new Date(announcement.week_end);
          
          // Resetar horas para comparar apenas a data
          const startDateOnly = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
          const endDateOnly = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
          
          console.log(`Aviso mock "${announcement.title}":`, {
            startDate: startDateOnly.toISOString(),
            endDate: endDateOnly.toISOString(),
            isInRange: today >= startDateOnly && today <= endDateOnly
          });
          
          return today >= startDateOnly && today <= endDateOnly;
        });
        setAnnouncements(activeAnnouncements);
        setLoading(false);
        setError('API unavailable, using mock data');
      });

    return () => controller.abort();
  }, []);

  return { announcements, loading, error };
}; 
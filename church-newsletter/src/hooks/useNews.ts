import { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { News } from '../types';
import { mockNews } from '../data/mockData';

const API_BASE_URL = 'http://localhost:3001/api';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: any;
}

export const useNews = () => {
  const [news, setNews] = useState<News[]>([]); // sempre array vazio
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    
    axios.get(`${API_BASE_URL}/news`, {
      timeout: 30000,
      signal: controller.signal
    })
      .then((res: AxiosResponse<ApiResponse<News[]>>) => {
        const data = Array.isArray(res.data.data) ? res.data.data : [];
        // Filtrar apenas notícias publicadas
        const publishedNews = data.filter(news => news.is_published);
        setNews(publishedNews);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        console.warn('API unavailable, using mock data:', err.message);
        const mockData = Array.isArray(mockNews) ? mockNews : [];
        // Filtrar apenas notícias publicadas dos dados mock
        const publishedNews = mockData.filter(news => news.is_published);
        setNews(publishedNews);
        setLoading(false);
        setError('API unavailable, using mock data');
      });

    return () => controller.abort();
  }, []);

  return { news, loading, error };
}; 
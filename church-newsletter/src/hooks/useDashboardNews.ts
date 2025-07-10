import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';
import { News } from '../types';

export const useDashboardNews = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiService.getNews();
      if (response.success && response.data) {
        setNews(Array.isArray(response.data) ? response.data : []);
      }
      setError(null);
    } catch (err) {
      console.error('Erro ao carregar notícias:', err);
      setError('Erro ao carregar notícias');
    } finally {
      setLoading(false);
    }
  }, []);

  const createNews = useCallback(async (newsData: Partial<News>) => {
    try {
      const response = await apiService.createNews(newsData);
      if (response.success) {
        await fetchNews(); // Recarregar lista
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao criar notícia:', err);
      return { success: false, error: 'Erro ao criar notícia' };
    }
  }, [fetchNews]);

  const updateNews = useCallback(async (id: string, newsData: Partial<News>) => {
    try {
      const response = await apiService.updateNews(id, newsData);
      if (response.success) {
        await fetchNews(); // Recarregar lista
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao atualizar notícia:', err);
      return { success: false, error: 'Erro ao atualizar notícia' };
    }
  }, [fetchNews]);

  const deleteNews = useCallback(async (id: string) => {
    try {
      const response = await apiService.deleteNews(id);
      if (response.success) {
        await fetchNews(); // Recarregar lista
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao excluir notícia:', err);
      return { success: false, error: 'Erro ao excluir notícia' };
    }
  }, [fetchNews]);

  const publishNews = useCallback(async (id: string) => {
    try {
      const response = await apiService.publishNews(id);
      if (response.success) {
        await fetchNews(); // Recarregar lista
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao publicar notícia:', err);
      return { success: false, error: 'Erro ao publicar notícia' };
    }
  }, [fetchNews]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return {
    news,
    loading,
    error,
    fetchNews,
    createNews,
    updateNews,
    deleteNews,
    publishNews
  };
}; 
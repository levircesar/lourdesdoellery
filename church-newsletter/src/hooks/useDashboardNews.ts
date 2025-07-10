import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';
import { News } from '../types';

export const useDashboardNews = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllNews = useCallback(async () => {
    try {
      setLoading(true);
      let allNews: News[] = [];
      let currentPage = 1;
      let hasMorePages = true;

      // Buscar todas as páginas
      while (hasMorePages) {
        const response = await apiService.getNews({ page: currentPage, limit: 100 });
        
        if (response.success && response.data) {
          const pageData = Array.isArray(response.data) ? response.data : [];
          allNews = [...allNews, ...pageData];
          
          // Verificar se há mais páginas
          if (response.pagination) {
            hasMorePages = currentPage < response.pagination.pages;
            currentPage++;
          } else {
            hasMorePages = false;
          }
        } else {
          hasMorePages = false;
        }
      }

      setNews(allNews);
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
        await fetchAllNews(); // Recarregar lista completa
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao criar notícia:', err);
      return { success: false, error: 'Erro ao criar notícia' };
    }
  }, [fetchAllNews]);

  const updateNews = useCallback(async (id: string, newsData: Partial<News>) => {
    try {
      const response = await apiService.updateNews(id, newsData);
      if (response.success) {
        await fetchAllNews(); // Recarregar lista completa
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao atualizar notícia:', err);
      return { success: false, error: 'Erro ao atualizar notícia' };
    }
  }, [fetchAllNews]);

  const deleteNews = useCallback(async (id: string) => {
    try {
      const response = await apiService.deleteNews(id);
      if (response.success) {
        await fetchAllNews(); // Recarregar lista completa
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao excluir notícia:', err);
      return { success: false, error: 'Erro ao excluir notícia' };
    }
  }, [fetchAllNews]);

  const publishNews = useCallback(async (id: string) => {
    try {
      const response = await apiService.publishNews(id);
      if (response.success) {
        await fetchAllNews(); // Recarregar lista completa
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao publicar notícia:', err);
      return { success: false, error: 'Erro ao publicar notícia' };
    }
  }, [fetchAllNews]);

  useEffect(() => {
    fetchAllNews();
  }, [fetchAllNews]);

  return {
    news,
    loading,
    error,
    fetchNews: fetchAllNews,
    createNews,
    updateNews,
    deleteNews,
    publishNews
  };
}; 
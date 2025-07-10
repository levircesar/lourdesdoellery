import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';
import { Dizimista } from '../types';

export const useDashboardDizimistas = () => {
  const [dizimistas, setDizimistas] = useState<Dizimista[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllDizimistas = useCallback(async () => {
    try {
      setLoading(true);
      let allDizimistas: Dizimista[] = [];
      let currentPage = 1;
      let hasMorePages = true;

      // Buscar todas as páginas
      while (hasMorePages) {
        const response = await apiService.getDizimistas({ page: currentPage, limit: 100 });
        
        if (response.success && response.data) {
          const pageData = Array.isArray(response.data) ? response.data : [];
          allDizimistas = [...allDizimistas, ...pageData];
          
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

      setDizimistas(allDizimistas);
      setError(null);
    } catch (err) {
      console.error('Erro ao carregar dizimistas:', err);
      setError('Erro ao carregar dizimistas');
    } finally {
      setLoading(false);
    }
  }, []);

  const createDizimista = useCallback(async (dizimistaData: Partial<Dizimista>) => {
    try {
      const response = await apiService.createDizimista(dizimistaData);
      if (response.success) {
        await fetchAllDizimistas(); // Recarregar lista completa
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao criar dizimista:', err);
      return { success: false, error: 'Erro ao criar dizimista' };
    }
  }, [fetchAllDizimistas]);

  const updateDizimista = useCallback(async (id: string, dizimistaData: Partial<Dizimista>) => {
    try {
      const response = await apiService.updateDizimista(id, dizimistaData);
      if (response.success) {
        await fetchAllDizimistas(); // Recarregar lista completa
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao atualizar dizimista:', err);
      return { success: false, error: 'Erro ao atualizar dizimista' };
    }
  }, [fetchAllDizimistas]);

  const deleteDizimista = useCallback(async (id: string) => {
    try {
      const response = await apiService.deleteDizimista(id);
      if (response.success) {
        await fetchAllDizimistas(); // Recarregar lista completa
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao excluir dizimista:', err);
      return { success: false, error: 'Erro ao excluir dizimista' };
    }
  }, [fetchAllDizimistas]);

  useEffect(() => {
    fetchAllDizimistas();
  }, [fetchAllDizimistas]);

  return {
    dizimistas,
    loading,
    error,
    fetchDizimistas: fetchAllDizimistas,
    createDizimista,
    updateDizimista,
    deleteDizimista
  };
}; 
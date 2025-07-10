import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';
import { Dizimista } from '../types';

export const useDashboardDizimistas = () => {
  const [dizimistas, setDizimistas] = useState<Dizimista[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDizimistas = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiService.getDizimistas();
      if (response.success && response.data) {
        setDizimistas(Array.isArray(response.data) ? response.data : []);
      }
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
        await fetchDizimistas(); // Recarregar lista
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao criar dizimista:', err);
      return { success: false, error: 'Erro ao criar dizimista' };
    }
  }, [fetchDizimistas]);

  const updateDizimista = useCallback(async (id: string, dizimistaData: Partial<Dizimista>) => {
    try {
      const response = await apiService.updateDizimista(id, dizimistaData);
      if (response.success) {
        await fetchDizimistas(); // Recarregar lista
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao atualizar dizimista:', err);
      return { success: false, error: 'Erro ao atualizar dizimista' };
    }
  }, [fetchDizimistas]);

  const deleteDizimista = useCallback(async (id: string) => {
    try {
      const response = await apiService.deleteDizimista(id);
      if (response.success) {
        await fetchDizimistas(); // Recarregar lista
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao excluir dizimista:', err);
      return { success: false, error: 'Erro ao excluir dizimista' };
    }
  }, [fetchDizimistas]);

  useEffect(() => {
    fetchDizimistas();
  }, [fetchDizimistas]);

  return {
    dizimistas,
    loading,
    error,
    fetchDizimistas,
    createDizimista,
    updateDizimista,
    deleteDizimista
  };
}; 
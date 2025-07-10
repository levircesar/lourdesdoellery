import { useState, useCallback } from 'react';
import apiService from '../services/api';
import { mockDizimistas } from '../data/mockData';
import { Dizimista, DizimistaFormData } from '../types';

export const useDizimistas = () => {
  const [dizimistas, setDizimistas] = useState<Dizimista[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  const fetchDizimistas = async (params?: { page?: number; limit?: number; search?: string; category?: string; is_active?: boolean }) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getDizimistas(params);
      
      if (response.success && response.data) {
        setDizimistas(response.data as Dizimista[]);
        if (response.pagination) {
          setPagination(response.pagination);
        }
      }
    } catch (err) {
      console.error('Erro ao buscar dizimistas:', err);
      setError('Erro ao carregar dizimistas');
      // Filtrar apenas dizimistas ativos dos dados mock
      const activeDizimistas = mockDizimistas.filter(dizimista => dizimista.is_active);
      setDizimistas(activeDizimistas);
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveDizimistas = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getActiveDizimistas();
      
      if (response.success && response.data) {
        setDizimistas(response.data as Dizimista[]);
      }
    } catch (err) {
      console.error('Erro ao buscar dizimistas ativos:', err);
      setError('Erro ao carregar dizimistas');
      // Filtrar apenas dizimistas ativos dos dados mock
      const activeDizimistas = mockDizimistas.filter(dizimista => dizimista.is_active);
      setDizimistas(activeDizimistas);
    } finally {
      setLoading(false);
    }
  };

  const getDizimistaById = useCallback(async (id: string) => {
    try {
      const response = await apiService.getDizimistaById(id);
      if (response.success && response.data) {
        return response.data;
      }
      // Fallback para mock data
      return mockDizimistas.find(d => d.id === id) || null;
    } catch (err) {
      console.error('Erro ao buscar dizimista:', err);
      // Fallback para mock data
      return mockDizimistas.find(d => d.id === id) || null;
    }
  }, []);

  const createDizimista = async (dizimistaData: DizimistaFormData): Promise<boolean> => {
    try {
      setError(null);
      const response = await apiService.createDizimista(dizimistaData);
      
      if (response.success) {
        await fetchDizimistas();
        return true;
      }
      return false;
    } catch (err: any) {
      console.error('Erro ao criar dizimista:', err);
      setError(err.message || 'Erro ao criar dizimista');
      return false;
    }
  };

  const updateDizimista = async (id: string, dizimistaData: DizimistaFormData): Promise<boolean> => {
    try {
      setError(null);
      const response = await apiService.updateDizimista(id, dizimistaData);
      
      if (response.success) {
        await fetchDizimistas();
        return true;
      }
      return false;
    } catch (err: any) {
      console.error('Erro ao atualizar dizimista:', err);
      setError(err.message || 'Erro ao atualizar dizimista');
      return false;
    }
  };

  const deleteDizimista = async (id: string): Promise<boolean> => {
    try {
      setError(null);
      const response = await apiService.deleteDizimista(id);
      
      if (response.success) {
        await fetchDizimistas();
        return true;
      }
      return false;
    } catch (err: any) {
      console.error('Erro ao deletar dizimista:', err);
      setError(err.message || 'Erro ao deletar dizimista');
      return false;
    }
  };

  return {
    dizimistas,
    loading,
    error,
    pagination,
    fetchDizimistas,
    fetchActiveDizimistas,
    getDizimistaById,
    createDizimista,
    updateDizimista,
    deleteDizimista
  };
}; 
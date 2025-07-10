import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';
import { ParishInfo } from '../types';

export const useDashboardParishInfo = () => {
  const [parishInfo, setParishInfo] = useState<ParishInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllParishInfo = useCallback(async () => {
    try {
      setLoading(true);
      let allParishInfo: ParishInfo[] = [];
      let currentPage = 1;
      let hasMorePages = true;

      // Buscar todas as páginas
      while (hasMorePages) {
        const response = await apiService.getParishInfo({ page: currentPage, limit: 100 });
        
        if (response.success && response.data) {
          const pageData = Array.isArray(response.data) ? response.data : [];
          allParishInfo = [...allParishInfo, ...pageData];
          
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

      setParishInfo(allParishInfo);
      setError(null);
    } catch (err) {
      console.error('Erro ao carregar informações da paróquia:', err);
      setError('Erro ao carregar informações da paróquia');
    } finally {
      setLoading(false);
    }
  }, []);

  const createParishInfo = useCallback(async (parishInfoData: Partial<ParishInfo>) => {
    try {
      const response = await apiService.createParishInfo(parishInfoData);
      if (response.success) {
        await fetchAllParishInfo(); // Recarregar lista completa
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao criar informação da paróquia:', err);
      return { success: false, error: 'Erro ao criar informação da paróquia' };
    }
  }, [fetchAllParishInfo]);

  const updateParishInfo = useCallback(async (id: string, parishInfoData: Partial<ParishInfo>) => {
    try {
      const response = await apiService.updateParishInfo(id, parishInfoData);
      if (response.success) {
        await fetchAllParishInfo(); // Recarregar lista completa
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao atualizar informação da paróquia:', err);
      return { success: false, error: 'Erro ao atualizar informação da paróquia' };
    }
  }, [fetchAllParishInfo]);

  const deleteParishInfo = useCallback(async (id: string) => {
    try {
      const response = await apiService.deleteParishInfo(id);
      if (response.success) {
        await fetchAllParishInfo(); // Recarregar lista completa
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao excluir informação da paróquia:', err);
      return { success: false, error: 'Erro ao excluir informação da paróquia' };
    }
  }, [fetchAllParishInfo]);

  useEffect(() => {
    fetchAllParishInfo();
  }, [fetchAllParishInfo]);

  return {
    parishInfo,
    loading,
    error,
    fetchParishInfo: fetchAllParishInfo,
    createParishInfo,
    updateParishInfo,
    deleteParishInfo
  };
}; 
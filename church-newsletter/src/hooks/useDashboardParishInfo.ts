import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';
import { ParishInfo } from '../types';

export const useDashboardParishInfo = () => {
  const [parishInfo, setParishInfo] = useState<ParishInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchParishInfo = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiService.getParishInfo();
      if (response.success && response.data) {
        setParishInfo(Array.isArray(response.data) ? response.data : []);
      }
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
        await fetchParishInfo(); // Recarregar lista
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao criar informação da paróquia:', err);
      return { success: false, error: 'Erro ao criar informação da paróquia' };
    }
  }, [fetchParishInfo]);

  const updateParishInfo = useCallback(async (id: string, parishInfoData: Partial<ParishInfo>) => {
    try {
      const response = await apiService.updateParishInfo(id, parishInfoData);
      if (response.success) {
        await fetchParishInfo(); // Recarregar lista
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao atualizar informação da paróquia:', err);
      return { success: false, error: 'Erro ao atualizar informação da paróquia' };
    }
  }, [fetchParishInfo]);

  const deleteParishInfo = useCallback(async (id: string) => {
    try {
      const response = await apiService.deleteParishInfo(id);
      if (response.success) {
        await fetchParishInfo(); // Recarregar lista
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao excluir informação da paróquia:', err);
      return { success: false, error: 'Erro ao excluir informação da paróquia' };
    }
  }, [fetchParishInfo]);

  useEffect(() => {
    fetchParishInfo();
  }, [fetchParishInfo]);

  return {
    parishInfo,
    loading,
    error,
    fetchParishInfo,
    createParishInfo,
    updateParishInfo,
    deleteParishInfo
  };
}; 
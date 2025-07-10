import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';
import { Birthday } from '../types';

export const useDashboardBirthdays = () => {
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBirthdays = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiService.getBirthdays();
      if (response.success && response.data) {
        setBirthdays(Array.isArray(response.data) ? response.data : []);
      }
      setError(null);
    } catch (err) {
      console.error('Erro ao carregar aniversariantes:', err);
      setError('Erro ao carregar aniversariantes');
    } finally {
      setLoading(false);
    }
  }, []);

  const createBirthday = useCallback(async (birthdayData: Partial<Birthday>) => {
    try {
      const response = await apiService.createBirthday(birthdayData);
      if (response.success) {
        await fetchBirthdays(); // Recarregar lista
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao criar aniversariante:', err);
      return { success: false, error: 'Erro ao criar aniversariante' };
    }
  }, [fetchBirthdays]);

  const updateBirthday = useCallback(async (id: string, birthdayData: Partial<Birthday>) => {
    try {
      const response = await apiService.updateBirthday(id, birthdayData);
      if (response.success) {
        await fetchBirthdays(); // Recarregar lista
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao atualizar aniversariante:', err);
      return { success: false, error: 'Erro ao atualizar aniversariante' };
    }
  }, [fetchBirthdays]);

  const deleteBirthday = useCallback(async (id: string) => {
    try {
      const response = await apiService.deleteBirthday(id);
      if (response.success) {
        await fetchBirthdays(); // Recarregar lista
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao excluir aniversariante:', err);
      return { success: false, error: 'Erro ao excluir aniversariante' };
    }
  }, [fetchBirthdays]);

  useEffect(() => {
    fetchBirthdays();
  }, [fetchBirthdays]);

  return {
    birthdays,
    loading,
    error,
    fetchBirthdays,
    createBirthday,
    updateBirthday,
    deleteBirthday
  };
}; 
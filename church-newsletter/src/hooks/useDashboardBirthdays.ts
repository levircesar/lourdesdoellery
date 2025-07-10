import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';
import { Birthday } from '../types';

export const useDashboardBirthdays = () => {
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllBirthdays = useCallback(async () => {
    try {
      setLoading(true);
      let allBirthdays: Birthday[] = [];
      let currentPage = 1;
      let hasMorePages = true;

      // Buscar todas as páginas
      while (hasMorePages) {
        const response = await apiService.getBirthdays({ page: currentPage, limit: 100 });
        
        if (response.success && response.data) {
          const pageData = Array.isArray(response.data) ? response.data : [];
          allBirthdays = [...allBirthdays, ...pageData];
          
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

      setBirthdays(allBirthdays);
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
        await fetchAllBirthdays(); // Recarregar lista completa
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao criar aniversariante:', err);
      return { success: false, error: 'Erro ao criar aniversariante' };
    }
  }, [fetchAllBirthdays]);

  const updateBirthday = useCallback(async (id: string, birthdayData: Partial<Birthday>) => {
    try {
      const response = await apiService.updateBirthday(id, birthdayData);
      if (response.success) {
        await fetchAllBirthdays(); // Recarregar lista completa
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao atualizar aniversariante:', err);
      return { success: false, error: 'Erro ao atualizar aniversariante' };
    }
  }, [fetchAllBirthdays]);

  const deleteBirthday = useCallback(async (id: string) => {
    try {
      const response = await apiService.deleteBirthday(id);
      if (response.success) {
        await fetchAllBirthdays(); // Recarregar lista completa
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao excluir aniversariante:', err);
      return { success: false, error: 'Erro ao excluir aniversariante' };
    }
  }, [fetchAllBirthdays]);

  useEffect(() => {
    fetchAllBirthdays();
  }, [fetchAllBirthdays]);

  return {
    birthdays,
    loading,
    error,
    fetchBirthdays: fetchAllBirthdays,
    createBirthday,
    updateBirthday,
    deleteBirthday
  };
}; 
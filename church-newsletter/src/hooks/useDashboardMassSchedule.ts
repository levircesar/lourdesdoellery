import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';
import { MassSchedule } from '../types';

export const useDashboardMassSchedule = () => {
  const [massSchedules, setMassSchedules] = useState<MassSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllMassSchedules = useCallback(async () => {
    try {
      setLoading(true);
      let allMassSchedules: MassSchedule[] = [];
      let currentPage = 1;
      let hasMorePages = true;

      // Buscar todas as páginas
      while (hasMorePages) {
        const response = await apiService.getMassSchedule({ page: currentPage, limit: 100 });
        
        if (response.success && response.data) {
          const pageData = Array.isArray(response.data) ? response.data : [];
          allMassSchedules = [...allMassSchedules, ...pageData];
          
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

      setMassSchedules(allMassSchedules);
      setError(null);
    } catch (err) {
      console.error('Erro ao carregar horários de missa:', err);
      setError('Erro ao carregar horários de missa');
    } finally {
      setLoading(false);
    }
  }, []);

  const createMassSchedule = useCallback(async (massScheduleData: Partial<MassSchedule>) => {
    try {
      const response = await apiService.createMassSchedule(massScheduleData);
      if (response.success) {
        await fetchAllMassSchedules(); // Recarregar lista completa
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao criar horário de missa:', err);
      return { success: false, error: 'Erro ao criar horário de missa' };
    }
  }, [fetchAllMassSchedules]);

  const updateMassSchedule = useCallback(async (id: string, massScheduleData: Partial<MassSchedule>) => {
    try {
      const response = await apiService.updateMassSchedule(id, massScheduleData);
      if (response.success) {
        await fetchAllMassSchedules(); // Recarregar lista completa
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao atualizar horário de missa:', err);
      return { success: false, error: 'Erro ao atualizar horário de missa' };
    }
  }, [fetchAllMassSchedules]);

  const deleteMassSchedule = useCallback(async (id: string) => {
    try {
      const response = await apiService.deleteMassSchedule(id);
      if (response.success) {
        await fetchAllMassSchedules(); // Recarregar lista completa
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao excluir horário de missa:', err);
      return { success: false, error: 'Erro ao excluir horário de missa' };
    }
  }, [fetchAllMassSchedules]);

  const generatePrintReport = useCallback(async () => {
    try {
      const response = await apiService.getMassSchedulePrintReport();
      if (response.success) {
        return { success: true, data: response.data };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao gerar relatório de horários de missa:', err);
      return { success: false, error: 'Erro ao gerar relatório de horários de missa' };
    }
  }, []);

  useEffect(() => {
    fetchAllMassSchedules();
  }, [fetchAllMassSchedules]);

  return {
    massSchedules,
    loading,
    error,
    fetchMassSchedules: fetchAllMassSchedules,
    createMassSchedule,
    updateMassSchedule,
    deleteMassSchedule,
    generatePrintReport
  };
}; 
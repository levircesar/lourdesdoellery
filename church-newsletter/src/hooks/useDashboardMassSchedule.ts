import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';
import { MassSchedule } from '../types';

export const useDashboardMassSchedule = () => {
  const [massSchedules, setMassSchedules] = useState<MassSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMassSchedules = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiService.getMassSchedule();
      if (response.success && response.data) {
        setMassSchedules(Array.isArray(response.data) ? response.data : []);
      }
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
        await fetchMassSchedules(); // Recarregar lista
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao criar horário de missa:', err);
      return { success: false, error: 'Erro ao criar horário de missa' };
    }
  }, [fetchMassSchedules]);

  const updateMassSchedule = useCallback(async (id: string, massScheduleData: Partial<MassSchedule>) => {
    try {
      const response = await apiService.updateMassSchedule(id, massScheduleData);
      if (response.success) {
        await fetchMassSchedules(); // Recarregar lista
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao atualizar horário de missa:', err);
      return { success: false, error: 'Erro ao atualizar horário de missa' };
    }
  }, [fetchMassSchedules]);

  const deleteMassSchedule = useCallback(async (id: string) => {
    try {
      const response = await apiService.deleteMassSchedule(id);
      if (response.success) {
        await fetchMassSchedules(); // Recarregar lista
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao excluir horário de missa:', err);
      return { success: false, error: 'Erro ao excluir horário de missa' };
    }
  }, [fetchMassSchedules]);

  useEffect(() => {
    fetchMassSchedules();
  }, [fetchMassSchedules]);

  return {
    massSchedules,
    loading,
    error,
    fetchMassSchedules,
    createMassSchedule,
    updateMassSchedule,
    deleteMassSchedule
  };
}; 
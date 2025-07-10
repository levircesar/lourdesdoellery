import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';
import { Announcement } from '../types';

export const useDashboardAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnnouncements = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiService.getAnnouncements();
      if (response.success && response.data) {
        setAnnouncements(Array.isArray(response.data) ? response.data : []);
      }
      setError(null);
    } catch (err) {
      console.error('Erro ao carregar avisos:', err);
      setError('Erro ao carregar avisos');
    } finally {
      setLoading(false);
    }
  }, []);

  const createAnnouncement = useCallback(async (announcementData: Partial<Announcement>) => {
    try {
      const response = await apiService.createAnnouncement(announcementData);
      if (response.success) {
        await fetchAnnouncements(); // Recarregar lista
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao criar aviso:', err);
      return { success: false, error: 'Erro ao criar aviso' };
    }
  }, [fetchAnnouncements]);

  const updateAnnouncement = useCallback(async (id: string, announcementData: Partial<Announcement>) => {
    try {
      const response = await apiService.updateAnnouncement(id, announcementData);
      if (response.success) {
        await fetchAnnouncements(); // Recarregar lista
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao atualizar aviso:', err);
      return { success: false, error: 'Erro ao atualizar aviso' };
    }
  }, [fetchAnnouncements]);

  const deleteAnnouncement = useCallback(async (id: string) => {
    try {
      const response = await apiService.deleteAnnouncement(id);
      if (response.success) {
        await fetchAnnouncements(); // Recarregar lista
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao excluir aviso:', err);
      return { success: false, error: 'Erro ao excluir aviso' };
    }
  }, [fetchAnnouncements]);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  return {
    announcements,
    loading,
    error,
    fetchAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
  };
}; 
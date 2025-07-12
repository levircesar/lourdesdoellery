import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';
import { Announcement } from '../types';

export const useDashboardAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllAnnouncements = useCallback(async () => {
    try {
      setLoading(true);
      let allAnnouncements: Announcement[] = [];
      let currentPage = 1;
      let hasMorePages = true;

      // Buscar todas as páginas
      while (hasMorePages) {
        const response = await apiService.getAnnouncements({ page: currentPage, limit: 100 });
        
        if (response.success && response.data) {
          const pageData = Array.isArray(response.data) ? response.data : [];
          allAnnouncements = [...allAnnouncements, ...pageData];
          
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

      setAnnouncements(allAnnouncements);
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
        await fetchAllAnnouncements(); // Recarregar lista completa
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao criar aviso:', err);
      return { success: false, error: 'Erro ao criar aviso' };
    }
  }, [fetchAllAnnouncements]);

  const updateAnnouncement = useCallback(async (id: string, announcementData: Partial<Announcement>) => {
    try {
      const response = await apiService.updateAnnouncement(id, announcementData);
      if (response.success) {
        await fetchAllAnnouncements(); // Recarregar lista completa
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao atualizar aviso:', err);
      return { success: false, error: 'Erro ao atualizar aviso' };
    }
  }, [fetchAllAnnouncements]);

  const deleteAnnouncement = useCallback(async (id: string) => {
    try {
      const response = await apiService.deleteAnnouncement(id);
      if (response.success) {
        await fetchAllAnnouncements(); // Recarregar lista completa
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao excluir aviso:', err);
      return { success: false, error: 'Erro ao excluir aviso' };
    }
  }, [fetchAllAnnouncements]);

  const generatePrintReport = useCallback(async () => {
    try {
      const response = await apiService.getAnnouncementsPrintReport();
      if (response.success) {
        return { success: true, data: response.data };
      }
      return { success: false, error: response.message };
    } catch (err) {
      console.error('Erro ao gerar relatório de avisos:', err);
      return { success: false, error: 'Erro ao gerar relatório de avisos' };
    }
  }, []);

  useEffect(() => {
    fetchAllAnnouncements();
  }, [fetchAllAnnouncements]);

  return {
    announcements,
    loading,
    error,
    fetchAnnouncements: fetchAllAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    generatePrintReport
  };
}; 
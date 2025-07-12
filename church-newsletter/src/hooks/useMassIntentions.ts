import { useState, useEffect } from 'react';
import axios from 'axios';
import { MassIntention, MassIntentionFormData } from '../types';
import { API_CONFIG } from '../config/api';

const API_BASE_URL = API_CONFIG.BASE_URL;

interface UseMassIntentionsReturn {
  massIntentions: MassIntention[];
  loading: boolean;
  error: string | null;
  createMassIntention: (data: MassIntentionFormData) => Promise<{ success: boolean; error?: string }>;
  updateMassIntention: (id: string, data: MassIntentionFormData) => Promise<{ success: boolean; error?: string }>;
  deleteMassIntention: (id: string) => Promise<{ success: boolean; error?: string }>;
  deleteAllNonRecurring: () => Promise<{ success: boolean; error?: string; deletedCount?: number }>;
  generatePrintReport: (filters?: any) => Promise<{ success: boolean; data?: any; error?: string }>;
  refetch: () => void;
}

export const useMassIntentions = (filters?: {
  search?: string;
  filter_type?: 'thanksgiving' | 'deceased';
  filter_recurring?: boolean;
  filter_date_from?: string;
  filter_date_to?: string;
}): UseMassIntentionsReturn => {
  const [massIntentions, setMassIntentions] = useState<MassIntention[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMassIntentions = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (filters?.search) params.append('search', filters.search);
      if (filters?.filter_type) params.append('filter_type', filters.filter_type);
      if (filters?.filter_recurring !== undefined) params.append('filter_recurring', filters.filter_recurring.toString());
      if (filters?.filter_date_from) params.append('filter_date_from', filters.filter_date_from);
      if (filters?.filter_date_to) params.append('filter_date_to', filters.filter_date_to);

      const token = localStorage.getItem('church_token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await axios.get(`${API_BASE_URL}/mass-intentions?${params.toString()}`, { headers });
      
      if (response.data.success) {
        setMassIntentions(response.data.data);
      } else {
        setError(response.data.message || 'Erro ao carregar intenções de missa');
      }
    } catch (err: any) {
      console.error('Erro ao buscar intenções de missa:', err);
      setError(err.response?.data?.message || 'Erro ao carregar intenções de missa');
    } finally {
      setLoading(false);
    }
  };

  const createMassIntention = async (data: MassIntentionFormData) => {
    try {
      const token = localStorage.getItem('church_token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await axios.post(`${API_BASE_URL}/mass-intentions`, data, { headers });
      
      if (response.data.success) {
        await fetchMassIntentions();
        return { success: true };
      } else {
        return { success: false, error: response.data.message };
      }
    } catch (err: any) {
      console.error('Erro ao criar intenção de missa:', err);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Erro ao criar intenção de missa' 
      };
    }
  };

  const updateMassIntention = async (id: string, data: MassIntentionFormData) => {
    try {
      const token = localStorage.getItem('church_token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await axios.put(`${API_BASE_URL}/mass-intentions/${id}`, data, { headers });
      
      if (response.data.success) {
        await fetchMassIntentions();
        return { success: true };
      } else {
        return { success: false, error: response.data.message };
      }
    } catch (err: any) {
      console.error('Erro ao atualizar intenção de missa:', err);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Erro ao atualizar intenção de missa' 
      };
    }
  };

  const deleteMassIntention = async (id: string) => {
    try {
      const token = localStorage.getItem('church_token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await axios.delete(`${API_BASE_URL}/mass-intentions/${id}`, { headers });
      
      if (response.data.success) {
        await fetchMassIntentions();
        return { success: true };
      } else {
        return { success: false, error: response.data.message };
      }
    } catch (err: any) {
      console.error('Erro ao excluir intenção de missa:', err);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Erro ao excluir intenção de missa' 
      };
    }
  };

  const deleteAllNonRecurring = async () => {
    try {
      const token = localStorage.getItem('church_token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await axios.delete(`${API_BASE_URL}/mass-intentions/delete-all-non-recurring`, { headers });
      
      if (response.data.success) {
        await fetchMassIntentions();
        return { success: true, deletedCount: response.data.deletedCount };
      } else {
        return { success: false, error: response.data.message };
      }
    } catch (err: any) {
      console.error('Erro ao excluir intenções não recorrentes:', err);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Erro ao excluir intenções não recorrentes' 
      };
    }
  };

  const generatePrintReport = async (reportFilters?: any) => {
    try {
      const params = new URLSearchParams();
      if (reportFilters?.filter_type) params.append('filter_type', reportFilters.filter_type);
      if (reportFilters?.filter_recurring !== undefined) params.append('filter_recurring', reportFilters.filter_recurring.toString());
      if (reportFilters?.filter_date_from) params.append('filter_date_from', reportFilters.filter_date_from);
      if (reportFilters?.filter_date_to) params.append('filter_date_to', reportFilters.filter_date_to);

      const token = localStorage.getItem('church_token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await axios.get(`${API_BASE_URL}/mass-intentions/print/report?${params.toString()}`, { headers });
      
      if (response.data.success) {
        return { success: true, data: response.data.data };
      } else {
        return { success: false, error: response.data.message };
      }
    } catch (err: any) {
      console.error('Erro ao gerar relatório:', err);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Erro ao gerar relatório' 
      };
    }
  };

  useEffect(() => {
    fetchMassIntentions();
  }, [filters]);

  return {
    massIntentions,
    loading,
    error,
    createMassIntention,
    updateMassIntention,
    deleteMassIntention,
    deleteAllNonRecurring,
    generatePrintReport,
    refetch: fetchMassIntentions
  };
}; 
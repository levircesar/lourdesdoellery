import { useState, useEffect } from 'react';
import { User } from '../types';
import apiService from '../services/api';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      console.log('Buscando usuários...');
      const response = await apiService.getUsers();
      console.log('Resposta da API de usuários:', response);
      
      if (response && response.data) {
        console.log('Usuários encontrados:', response.data);
        setUsers(response.data as User[] || []);
      } else {
        console.log('Resposta vazia ou sem dados');
        setUsers([]);
      }
      setError(null);
    } catch (err: any) {
      console.error('Erro ao carregar usuários:', err);
      setError(err.message || 'Erro ao carregar usuários');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: any) => {
    try {
      const response = await apiService.createUser(userData);
      await fetchUsers();
      return { success: true, data: response.data };
    } catch (err: any) {
      return { success: false, error: err.message || 'Erro ao criar usuário' };
    }
  };

  const updateUser = async (id: string, userData: any) => {
    try {
      const response = await apiService.updateUser(id, userData);
      await fetchUsers();
      return { success: true, data: response.data };
    } catch (err: any) {
      return { success: false, error: err.message || 'Erro ao atualizar usuário' };
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await apiService.deleteUser(id);
      await fetchUsers();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Erro ao deletar usuário' };
    }
  };

  const changeUserPassword = async (id: string, newPassword: string) => {
    try {
      await apiService.changeUserPassword(id, newPassword);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Erro ao alterar senha' };
    }
  };

  const changeOwnPassword = async (currentPassword: string, newPassword: string) => {
    try {
      await apiService.changeOwnPassword(currentPassword, newPassword);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Erro ao alterar senha' };
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    changeUserPassword,
    changeOwnPassword
  };
}; 
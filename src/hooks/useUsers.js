import { useState, useEffect, useCallback } from 'react';
import axios from '@/utils/axios';

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});

  // Obtener usuarios con filtros opcionales
  const fetchUsers = useCallback(async (filterParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value && value.trim() !== '') {
          params.append(key, value);
        }
      });

      const response = await axios.get(`/api/users?${params.toString()}`);
      console.log(response.data);
      if (response.data.success) {
        setUsers(response.data.users || []);
      } else {
        throw new Error(response.data.message || 'Error al obtener usuarios');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al cargar usuarios';
      setError(errorMessage);
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear nuevo usuario
  const createUser = useCallback(async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post('/api/users', userData);
      
      if (response.data.success) {
        // Refrescar la lista después de crear
        await fetchUsers(filters);
        return response.data;
      } else {
        throw new Error(response.data.message || 'Error al crear usuario');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al crear usuario';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [filters, fetchUsers]);

  // Actualizar usuario
  const updateUser = useCallback(async (id, userData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.put(`/api/users/${id}`, userData);
      
      if (response.data.success) {
        // Refrescar la lista después de actualizar
        await fetchUsers(filters);
        return response.data;
      } else {
        throw new Error(response.data.message || 'Error al actualizar usuario');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al actualizar usuario';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [filters, fetchUsers]);

  // Eliminar usuario
  const deleteUser = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.delete(`/api/users/${id}`);
      
      if (response.data.success) {
        // Refrescar la lista después de eliminar
        await fetchUsers(filters);
        return response.data;
      } else {
        throw new Error(response.data.message || 'Error al eliminar usuario');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al eliminar usuario';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [filters, fetchUsers]);

  // Aplicar filtros
  const applyFilters = useCallback((newFilters) => {
    setFilters(newFilters);
    fetchUsers(newFilters);
  }, [fetchUsers]);

  // Limpiar filtros
  const clearFilters = useCallback(() => {
    setFilters({});
    fetchUsers({});
  }, [fetchUsers]);

  // Cargar datos iniciales
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    filters,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    applyFilters,
    clearFilters,
    refetch: useCallback(() => fetchUsers(filters))
  };
};

export default useUsers;
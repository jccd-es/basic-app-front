import { useState, useEffect, useCallback } from 'react';
import axios from '@/utils/axios';

const useRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener roles
  const fetchRoles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get('/api/roles');

      // Manejo más flexible de la respuesta
      let rolesData = [];
      
      if (response.data) {
        if (response.data.success === true && response.data.roles) {
          rolesData = response.data.roles;
        } else if (Array.isArray(response.data)) {
          // Si la respuesta es directamente un array
          rolesData = response.data;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          // Si los roles están en data.data
          rolesData = response.data.data;
        } else if (response.data.roles && Array.isArray(response.data.roles)) {
          // Si hay roles pero no success flag
          rolesData = response.data.roles;
        } else {
          console.warn('⚠️ Unexpected API response structure:', response.data);
          throw new Error(response.data.message || 'Estructura de respuesta inesperada');
        }
      }

      setRoles(rolesData);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al cargar roles';
      setError(errorMessage);
      console.error('❌ Error fetching roles:', err);
      console.error('Response data:', err.response?.data);
    } finally {
      setLoading(false);
    }
  }, []);

  // Función refetch
  const refetch = useCallback(() => {
    return fetchRoles();
  }, [fetchRoles]);

  // Cargar datos iniciales
  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return {
    roles,
    loading,
    error,
    fetchRoles,
    refetch
  };
};

export default useRoles;

import { useState, useEffect, useCallback } from 'react';
import axios from '@/utils/axios';

const useVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});

  // Obtener vehículos con filtros opcionales
  const fetchVehicles = useCallback(async (filterParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value && value.trim() !== '') {
          params.append(key, value);
        }
      });

      const response = await axios.get(`/api/vehicles?${params.toString()}`);
      
      if (response.data.success) {
        setVehicles(response.data.vehicles || []);
      } else {
        throw new Error(response.data.message || 'Error al obtener vehículos');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al cargar vehículos';
      setError(errorMessage);
      console.error('Error fetching vehicles:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear nuevo vehículo
  const createVehicle = useCallback(async (vehicleData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post('/api/vehicles', vehicleData);
      
      if (response.data.success) {
        // Refrescar la lista después de crear
        await fetchVehicles(filters);
        return response.data;
      } else {
        throw new Error(response.data.message || 'Error al crear vehículo');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al crear vehículo';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [filters, fetchVehicles]);

  // Actualizar vehículo
  const updateVehicle = useCallback(async (id, vehicleData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.put(`/api/vehicles/${id}`, vehicleData);
      
      if (response.data.success) {
        // Refrescar la lista después de actualizar
        await fetchVehicles(filters);
        return response.data;
      } else {
        throw new Error(response.data.message || 'Error al actualizar vehículo');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al actualizar vehículo';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [filters, fetchVehicles]);

  // Eliminar vehículo
  const deleteVehicle = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.delete(`/api/vehicles/${id}`);
      
      if (response.data.success) {
        // Refrescar la lista después de eliminar
        await fetchVehicles(filters);
        return response.data;
      } else {
        throw new Error(response.data.message || 'Error al eliminar vehículo');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al eliminar vehículo';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [filters, fetchVehicles]);

  // Aplicar filtros
  const applyFilters = useCallback((newFilters) => {
    setFilters(newFilters);
    fetchVehicles(newFilters);
  }, [fetchVehicles]);

  // Limpiar filtros
  const clearFilters = useCallback(() => {
    setFilters({});
    fetchVehicles({});
  }, [fetchVehicles]);

  // Cargar datos iniciales
  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  return {
    vehicles,
    loading,
    error,
    filters,
    fetchVehicles,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    applyFilters,
    clearFilters,
    refetch: () => fetchVehicles(filters)
  };
};

export default useVehicles; 
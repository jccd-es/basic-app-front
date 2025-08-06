import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Grid,
  IconButton,
  TextField,
  Typography,
  Chip,
} from '@mui/material';
import {
  FilterList as FilterListIcon,
  Clear as ClearIcon,
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';

const VehicleFilters = ({ onFiltersChange, filters = {}, loading = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    matricula: filters.matricula || '',
    categoria: filters.categoria || '',
    tipo: filters.tipo || '',
    marca: filters.marca || '',
    modelo: filters.modelo || '',
    color: filters.color || '',
  });

  const handleFilterChange = (field) => (event) => {
    const value = event.target.value;
    setLocalFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApplyFilters = () => {
    // Filtrar campos vacíos
    const activeFilters = {};
    Object.entries(localFilters).forEach(([key, value]) => {
      if (value && value.trim() !== '') {
        activeFilters[key] = value.trim();
      }
    });
    
    onFiltersChange(activeFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      matricula: '',
      categoria: '',
      tipo: '',
      marca: '',
      modelo: '',
      color: '',
    };
    setLocalFilters(clearedFilters);
    onFiltersChange({});
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value && value.trim() !== '').length;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1}>
            <FilterListIcon />
            <Typography variant="h6">
              Filtros
            </Typography>
            {activeFiltersCount > 0 && (
              <Chip
                label={`${activeFiltersCount} activo${activeFiltersCount !== 1 ? 's' : ''}`}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
          </Box>
          
          <Box display="flex" alignItems="center" gap={1}>
            {activeFiltersCount > 0 && (
              <Button
                size="small"
                startIcon={<ClearIcon />}
                onClick={handleClearFilters}
                disabled={loading}
              >
                Limpiar
              </Button>
            )}
            <IconButton
              onClick={() => setIsExpanded(!isExpanded)}
              size="small"
            >
              {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
        </Box>

        <Collapse in={isExpanded}>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <TextField
                  fullWidth
                  size="small"
                  label="Matrícula"
                  value={localFilters.matricula}
                  onChange={handleFilterChange('matricula')}
                  placeholder="Ej: 1234ABC"
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4} lg={2}>
                <TextField
                  fullWidth
                  size="small"
                  label="Categoría"
                  value={localFilters.categoria}
                  onChange={handleFilterChange('categoria')}
                  placeholder="Ej: Premium"
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4} lg={2}>
                <TextField
                  fullWidth
                  size="small"
                  label="Tipo"
                  value={localFilters.tipo}
                  onChange={handleFilterChange('tipo')}
                  placeholder="Ej: Sedan"
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4} lg={2}>
                <TextField
                  fullWidth
                  size="small"
                  label="Marca"
                  value={localFilters.marca}
                  onChange={handleFilterChange('marca')}
                  placeholder="Ej: Toyota"
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4} lg={2}>
                <TextField
                  fullWidth
                  size="small"
                  label="Modelo"
                  value={localFilters.modelo}
                  onChange={handleFilterChange('modelo')}
                  placeholder="Ej: Corolla"
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4} lg={2}>
                <TextField
                  fullWidth
                  size="small"
                  label="Color"
                  value={localFilters.color}
                  onChange={handleFilterChange('color')}
                  placeholder="Ej: Blanco"
                  disabled={loading}
                />
              </Grid>
            </Grid>

            <Box display="flex" gap={2} mt={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                startIcon={<ClearIcon />}
                onClick={handleClearFilters}
                disabled={loading}
                size="small"
              >
                Limpiar
              </Button>
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={handleApplyFilters}
                disabled={loading}
                size="small"
              >
                Aplicar Filtros
              </Button>
            </Box>
          </Box>
        </Collapse>

        {/* Mostrar filtros activos cuando está colapsado */}
        {!isExpanded && activeFiltersCount > 0 && (
          <Box sx={{ mt: 1 }}>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {Object.entries(filters).map(([key, value]) => {
                if (!value || value.trim() === '') return null;
                
                const labels = {
                  matricula: 'Matrícula',
                  categoria: 'Categoría',
                  tipo: 'Tipo',
                  marca: 'Marca',
                  modelo: 'Modelo',
                  color: 'Color',
                };

                return (
                  <Chip
                    key={key}
                    label={`${labels[key]}: ${value}`}
                    size="small"
                    onDelete={() => {
                      const newFilters = { ...filters };
                      delete newFilters[key];
                      onFiltersChange(newFilters);
                    }}
                    disabled={loading}
                  />
                );
              })}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default VehicleFilters; 
import React, { useState, useEffect } from 'react';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  Divider,
} from '@mui/material';
import {
  DirectionsCar as DirectionsCarIcon,
  ColorLens as ColorLensIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';
import useVehicles from '@/hooks/useVehicles';

const VehicleFormDialog = ({ open, onClose, vehicle = null, onSuccess }) => {
  const { createVehicle, updateVehicle, loading } = useVehicles();
  const [formData, setFormData] = useState({
    categoria: '',
    tipo: '',
    marca: '',
    modelo: '',
    matricula: '',
    color: '',
    bastidor: '',
    kilometrosRecogida: '',
    kilometrosDevolucion: '',
    datosGps: '',
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const isEdit = Boolean(vehicle);

  // Cargar datos del vehículo para edición
  useEffect(() => {
    if (isEdit && vehicle) {
      setFormData({
        categoria: vehicle.categoria || '',
        tipo: vehicle.tipo || '',
        marca: vehicle.marca || '',
        modelo: vehicle.modelo || '',
        matricula: vehicle.matricula || '',
        color: vehicle.color || '',
        bastidor: vehicle.bastidor || '',
        kilometrosRecogida: vehicle.kilometrosRecogida?.toString() || '',
        kilometrosDevolucion: vehicle.kilometrosDevolucion?.toString() || '',
        datosGps: vehicle.datosGps || '',
      });
    } else {
      // Resetear formulario para nuevo vehículo
      setFormData({
        categoria: '',
        tipo: '',
        marca: '',
        modelo: '',
        matricula: '',
        color: '',
        bastidor: '',
        kilometrosRecogida: '',
        kilometrosDevolucion: '',
        datosGps: '',
      });
    }
    setErrors({});
    setSubmitError('');
  }, [vehicle, isEdit, open]);

  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Campos requeridos
    const requiredFields = ['categoria', 'tipo', 'marca', 'modelo', 'matricula', 'color'];
    requiredFields.forEach(field => {
      if (!formData[field]?.trim()) {
        newErrors[field] = 'Este campo es requerido';
      }
    });

    // Validaciones de longitud
    const maxLengths = {
      categoria: 100,
      tipo: 50,
      marca: 50,
      modelo: 100,
      matricula: 20,
      color: 30,
      bastidor: 50,
    };

    Object.entries(maxLengths).forEach(([field, maxLength]) => {
      if (formData[field] && formData[field].length > maxLength) {
        newErrors[field] = `Máximo ${maxLength} caracteres`;
      }
    });

    // Validar kilómetros (deben ser números positivos)
    ['kilometrosRecogida', 'kilometrosDevolucion'].forEach(field => {
      if (formData[field] && (isNaN(formData[field]) || parseFloat(formData[field]) < 0)) {
        newErrors[field] = 'Debe ser un número positivo';
      }
    });

    // Validar GPS (debe ser JSON válido si se proporciona)
    if (formData.datosGps && formData.datosGps.trim()) {
      try {
        JSON.parse(formData.datosGps);
      } catch (error) {
        newErrors.datosGps = 'Debe ser un JSON válido (ej: {"lat": 40.4168, "lng": -3.7038})';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setSubmitError('');

      // Preparar datos para envío
      const submitData = {
        categoria: formData.categoria.trim(),
        tipo: formData.tipo.trim(),
        marca: formData.marca.trim(),
        modelo: formData.modelo.trim(),
        matricula: formData.matricula.trim().toUpperCase(), // Matrícula en mayúsculas
        color: formData.color.trim(),
        bastidor: formData.bastidor.trim() || undefined,
        kilometrosRecogida: formData.kilometrosRecogida ? parseFloat(formData.kilometrosRecogida) : undefined,
        kilometrosDevolucion: formData.kilometrosDevolucion ? parseFloat(formData.kilometrosDevolucion) : undefined,
        datosGps: formData.datosGps.trim() || undefined,
      };

      // Eliminar campos undefined
      Object.keys(submitData).forEach(key => {
        if (submitData[key] === undefined) {
          delete submitData[key];
        }
      });

      if (isEdit) {
        await updateVehicle(vehicle.id, submitData);
      } else {
        await createVehicle(submitData);
      }

      if (onSuccess) {
        onSuccess();
      }
      
      handleClose();
    } catch (error) {
      setSubmitError(error.message || 'Error al guardar el vehículo');
    }
  };

  const handleClose = () => {
    setFormData({
      categoria: '',
      tipo: '',
      marca: '',
      modelo: '',
      matricula: '',
      color: '',
      bastidor: '',
      kilometrosRecogida: '',
      kilometrosDevolucion: '',
      datosGps: '',
    });
    setErrors({});
    setSubmitError('');
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <DirectionsCarIcon />
          {isEdit ? 'Editar Vehículo' : 'Nuevo Vehículo'}
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {submitError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {submitError}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Información básica */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DirectionsCarIcon fontSize="small" />
              Información Básica
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Categoría *"
              value={formData.categoria}
              onChange={handleInputChange('categoria')}
              error={Boolean(errors.categoria)}
              helperText={errors.categoria || 'Ej: Premium, Económico, SUV'}
              inputProps={{ maxLength: 100 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Tipo *"
              value={formData.tipo}
              onChange={handleInputChange('tipo')}
              error={Boolean(errors.tipo)}
              helperText={errors.tipo || 'Ej: Sedan, Hatchback, SUV'}
              inputProps={{ maxLength: 50 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Marca *"
              value={formData.marca}
              onChange={handleInputChange('marca')}
              error={Boolean(errors.marca)}
              helperText={errors.marca || 'Ej: Toyota, Volkswagen, Ford'}
              inputProps={{ maxLength: 50 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Modelo *"
              value={formData.modelo}
              onChange={handleInputChange('modelo')}
              error={Boolean(errors.modelo)}
              helperText={errors.modelo || 'Ej: Corolla, Golf, Focus'}
              inputProps={{ maxLength: 100 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Matrícula *"
              value={formData.matricula}
              onChange={handleInputChange('matricula')}
              error={Boolean(errors.matricula)}
              helperText={errors.matricula || 'Ej: 1234ABC'}
              inputProps={{ 
                maxLength: 20,
                style: { textTransform: 'uppercase' }
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Color *"
              value={formData.color}
              onChange={handleInputChange('color')}
              error={Boolean(errors.color)}
              helperText={errors.color || 'Ej: Blanco, Negro, Azul'}
              inputProps={{ maxLength: 30 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ColorLensIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Número de Bastidor"
              value={formData.bastidor}
              onChange={handleInputChange('bastidor')}
              error={Boolean(errors.bastidor)}
              helperText={errors.bastidor || 'Opcional - Número de identificación del chasis'}
              inputProps={{ maxLength: 50 }}
            />
          </Grid>

          {/* Información de kilómetros */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
              <SpeedIcon fontSize="small" />
              Información de Kilómetros
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Kilómetros Recogida"
              type="number"
              value={formData.kilometrosRecogida}
              onChange={handleInputChange('kilometrosRecogida')}
              error={Boolean(errors.kilometrosRecogida)}
              helperText={errors.kilometrosRecogida || 'Opcional - Kilómetros al momento de recogida'}
              inputProps={{ min: 0, step: 0.1 }}
              InputProps={{
                endAdornment: <InputAdornment position="end">km</InputAdornment>,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Kilómetros Devolución"
              type="number"
              value={formData.kilometrosDevolucion}
              onChange={handleInputChange('kilometrosDevolucion')}
              error={Boolean(errors.kilometrosDevolucion)}
              helperText={errors.kilometrosDevolucion || 'Opcional - Kilómetros al momento de devolución'}
              inputProps={{ min: 0, step: 0.1 }}
              InputProps={{
                endAdornment: <InputAdornment position="end">km</InputAdornment>,
              }}
            />
          </Grid>

          {/* Datos GPS */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Datos GPS"
              multiline
              rows={3}
              value={formData.datosGps}
              onChange={handleInputChange('datosGps')}
              error={Boolean(errors.datosGps)}
              helperText={errors.datosGps || 'Opcional - Datos GPS en formato JSON. Ej: {"lat": 40.4168, "lng": -3.7038}'}
              placeholder='{"lat": 40.4168, "lng": -3.7038}'
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} color="inherit">
          Cancelar
        </Button>
        <Button 
          type="submit" 
          variant="contained" 
          disabled={loading}
          startIcon={loading ? <Box sx={{ width: 20, height: 20 }} /> : <DirectionsCarIcon />}
        >
          {loading ? 'Guardando...' : (isEdit ? 'Actualizar' : 'Crear')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VehicleFormDialog; 
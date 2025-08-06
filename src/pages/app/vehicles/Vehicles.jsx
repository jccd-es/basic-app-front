import React, { useState, useCallback } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";

import {
  Box,
  Button,
  Divider as MuiDivider,
  Grid,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Add as AddIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { spacing } from "@mui/system";
import VehiclesTable from "./Vehicles.table.jsx";
import VehicleFormDialog from "./VehicleFormDialog.jsx";
import VehicleFilters from "./VehicleFilters.jsx";
import useVehicles from "@/hooks/useVehicles";

const Divider = styled(MuiDivider)(spacing);

function Vehicles() {
  const { loading, error, filters, applyFilters, refetch } = useVehicles();
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleNewVehicle = () => {
    setSelectedVehicle(null);
    setFormDialogOpen(true);
  };

  const handleEditVehicle = useCallback((vehicle) => {
    setSelectedVehicle(vehicle);
    setFormDialogOpen(true);
  }, []);

  const handleFormDialogClose = () => {
    setFormDialogOpen(false);
    setSelectedVehicle(null);
  };

  const handleFormSuccess = () => {
    setSnackbar({
      open: true,
      message: selectedVehicle 
        ? 'Vehículo actualizado correctamente' 
        : 'Vehículo creado correctamente',
      severity: 'success'
    });
    refetch(); // Refrescar la tabla
  };

  const handleFiltersChange = (newFilters) => {
    applyFilters(newFilters);
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleTableRefresh = () => {
    refetch();
  };

  return (
    <React.Fragment>
      <Helmet title="Vehículos" />
      
      {/* Header */}
      <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
        <Grid>
          <Typography variant="h3" gutterBottom display="inline">
            Vehículos
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gestiona la flota de vehículos disponibles para alquiler
          </Typography>
        </Grid>
        <Grid>
          <Box display="flex" gap={1}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              disabled={loading}
            >
              Actualizar
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleNewVehicle}
            >
              Nuevo Vehículo
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Divider my={4} />

      {/* Error global */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Filtros */}
      <VehicleFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        loading={loading}
      />

      {/* Tabla */}
      <Grid container spacing={6}>
        <Grid size={12}>
          <VehiclesTable 
            onEdit={handleEditVehicle}
            onRefresh={handleTableRefresh}
          />
        </Grid>
      </Grid>

      {/* Formulario de creación/edición */}
      <VehicleFormDialog
        open={formDialogOpen}
        onClose={handleFormDialogClose}
        vehicle={selectedVehicle}
        onSuccess={handleFormSuccess}
      />

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default Vehicles;

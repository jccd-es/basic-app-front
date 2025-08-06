import React, { useState } from "react";
import styled from "@emotion/styled";
import { 
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Paper as MuiPaper,
  Snackbar,
  Tooltip,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { spacing } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import useVehicles from "@/hooks/useVehicles";

const Paper = styled(MuiPaper)(spacing);

const formatDate = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatKilometers = (km) => {
  if (km === null || km === undefined) return '-';
  return `${km.toLocaleString()} km`;
};

function VehiclesTable({ onEdit, onRefresh }) {
  const { vehicles, loading, error, deleteVehicle } = useVehicles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleMenuClick = (event, vehicle) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedVehicle(vehicle);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedVehicle(null);
  };

  const handleEdit = () => {
    if (selectedVehicle && onEdit) {
      onEdit(selectedVehicle);
    }
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setVehicleToDelete(selectedVehicle);
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = async () => {
    if (!vehicleToDelete) return;

    try {
      await deleteVehicle(vehicleToDelete.id);
      setSnackbar({
        open: true,
        message: 'Vehículo eliminado correctamente',
        severity: 'success'
      });
      if (onRefresh) onRefresh();
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || 'Error al eliminar el vehículo',
        severity: 'error'
      });
    } finally {
      setDeleteDialogOpen(false);
      setVehicleToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setVehicleToDelete(null);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const columns = [
    { 
      field: "matricula", 
      headerName: "Matrícula",
      renderCell: (params) => (
        <Box sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          {params.value}
        </Box>
      ),
      flex: 1
    },
    {
      field: "categoria",
      headerName: "Categoría",
      flex: 1
    },
    {
      field: "tipo",
      headerName: "Tipo",
      flex: 1
    },
    {
      field: "marca",
      headerName: "Marca",
      flex: 1
    },
    {
      field: "modelo",
      headerName: "Modelo",
      flex: 1
    },
    {
      field: "color",
      headerName: "Color",
      flex: 1
    },
    // {
    //   field: "bastidor",
    //   headerName: "Bastidor",
    //   width: 180,
    //   renderCell: (params) => params.value || '-'
    // },
    // {
    //   field: "kilometrosRecogida",
    //   headerName: "Km Recogida",
    //   width: 130,
    //   type: 'number',
    //   renderCell: (params) => formatKilometers(params.value)
    // },
    // {
    //   field: "kilometrosDevolucion",
    //   headerName: "Km Devolución",
    //   width: 140,
    //   type: 'number',
    //   renderCell: (params) => formatKilometers(params.value)
    // },
    // {
    //   field: "creator",
    //   headerName: "Creado por",
    //   width: 160,
    //   renderCell: (params) => params.value?.name || '-'
    // },
    // {
    //   field: "createdAt",
    //   headerName: "Fecha creación",
    //   width: 160,
    //   renderCell: (params) => formatDate(params.value)
    // },
    {
      field: "actions",
      headerName: "",
      width: 55,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Tooltip title="Acciones">
          <IconButton
            size="small"
            onClick={(event) => handleMenuClick(event, params.row)}
          >
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  // Transformar datos para el DataGrid
  const rows = vehicles.map((vehicle) => ({
    ...vehicle,
    id: vehicle.id,
  }));

  if (error) {
    return (
      <Paper style={{ padding: 16 }}>
        <Alert severity="error">
          {error}
        </Alert>
      </Paper>
    );
  }

  return (
    <>
      <Paper style={{
        display: 'flex',
        flexDirection: 'column',
        width: "100%",
        minHeight: 400
      }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          initialState={{
            pagination: {
              paginationModel: {
                page: 0,
                pageSize: 10
              }
            },
          }}
          pageSizeOptions={[5, 10, 25, 50]}
          checkboxSelection
          disableColumnSorting={false}
          disableColumnFilter={false}
          disableColumnResize={false}
          autoHeight
          sx={{
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #f0f0f0',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
              borderBottom: '2px solid #e0e0e0',
            },
          }}
        />
      </Paper>

      {/* Menú de acciones */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleEdit}>
          <EditIcon sx={{ mr: 1, fontSize: 20 }} />
          Editar
        </MenuItem>
        <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1, fontSize: 20 }} />
          Eliminar
        </MenuItem>
      </Menu>

      {/* Diálogo de confirmación de eliminación */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Confirmar eliminación
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            ¿Estás seguro de que deseas eliminar el vehículo con matrícula{' '}
            <strong>{vehicleToDelete?.matricula}</strong>?
            <br />
            Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="inherit">
            Cancelar
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

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
    </>
  );
}

export default VehiclesTable;

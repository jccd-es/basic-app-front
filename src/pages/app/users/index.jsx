import React from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Checkbox,
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid,
  IconButton,
  Link,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { green, orange, red } from "@mui/material/colors";
import {
  Add as AddIcon,
  Archive as ArchiveIcon,
  FilterList as FilterListIcon,
  RemoveRedEye as RemoveRedEyeIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { spacing } from "@mui/system";
import UsersTable from "./Users.table.jsx";
import useUsers from "@/hooks/useUsers";

const Divider = styled(MuiDivider)(spacing);

function Index() {
  const { users, loading, error, refetch } = useUsers();
  const [notification, setNotification] = React.useState({ open: false, message: '', severity: 'info' });

  const handleNewUser = () => {
    // TODO: Abrir modal o formulario para crear nuevo usuario
    setNotification({
      open: true,
      message: 'Funcionalidad de crear usuario próximamente',
      severity: 'info'
    });
  };

  const handleRefresh = async () => {
    try {
      await refetch();
      setNotification({
        open: true,
        message: 'Lista de usuarios actualizada',
        severity: 'success'
      });
    } catch (err) {
      setNotification({
        open: true,
        message: 'Error al actualizar la lista',
        severity: 'error'
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <React.Fragment>
      <Helmet title="Users" />
      <Grid justifyContent="space-between" container spacing={10}>
        <Grid>
          <Typography variant="h3" gutterBottom display="inline">
            Users
          </Typography>
        </Grid>
        <Grid>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={handleRefresh}
              disabled={loading}
            >
              <RefreshIcon />
              Actualizar
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleNewUser}
              disabled={loading}
            >
              <AddIcon />
              Nuevo Usuario
            </Button>
          </div>
        </Grid>
      </Grid>
      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid size={12}>
          <UsersTable users={users} loading={loading} error={error} />
        </Grid>
      </Grid>
      
      <Snackbar 
        open={notification.open} 
        autoHideDuration={1000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity} 
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default Index;

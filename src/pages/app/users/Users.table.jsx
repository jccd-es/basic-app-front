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
  CircularProgress,
  Alert,
} from "@mui/material";
import { green, orange, red } from "@mui/material/colors";
import {
  Add as AddIcon,
  Archive as ArchiveIcon,
  FilterList as FilterListIcon,
  RemoveRedEye as RemoveRedEyeIcon,
} from "@mui/icons-material";
import { spacing } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import {
  MenuIcon
} from "lucide-react";

import useUsers from "@/hooks/useUsers";

const Paper = styled(MuiPaper)(spacing);

const columns = [
  {
    field: "name",
    headerName: "User",
    flex: 1,
    valueGetter: (value, row) => `${row.name || row.displayName || 'N/A'} - ${row.email || 'N/A'}`
  },
  {
    field: "actions",
    renderHeader: () => <MenuIcon />,
    width: 50,
    disableColumnMenu: true,
  },
];

function UsersTable() {
  const { users, loading, error } = useUsers();

  console.log({users});

  if (loading) {
    return (
      <Paper style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        width: "100%"
      }}>
        <CircularProgress />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        width: "100%"
      }}>
        <Alert severity="error">
          {error}
        </Alert>
      </Paper>
    );
  }

  return (
    <Paper style={{
      display: 'flex',
      flexDirection: 'column',
      width: "100%"
    }}>
      <DataGrid
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: 5
            }
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        rows={users}
        columns={columns}
        checkboxSelection
        disableColumnSorting
        disableColumnFilter
        disableColumnResize
        disableColumnMenu
      />
    </Paper>
  );
}

export default UsersTable;

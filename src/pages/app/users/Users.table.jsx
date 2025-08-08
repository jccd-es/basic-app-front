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

const Paper = styled(MuiPaper)(spacing);


const columns = [
  {
    field: "name",
    headerName: "User",
    flex: 1,
    valueGetter: (value, row) => `${row.name} - ${row.email}`
  },
  {
    field: "actions",
    renderHeader: () => <MenuIcon />,
    width: 50,
    disableColumnMenu: true,
  },
];

const rows = [
  {
    id: 1,
    name: 'Example User',
    email: 'example@rentingsuite.com'
  },
];

function VehiclesTable () {
  return <Paper style={{
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
      pageSizeOptions={[5]}
      rows={rows}
      columns={columns}
      checkboxSelection
      disableColumnSorting
      disableColumnFilter
      disableColumnResize
      disableColumnMenu
    />
  </Paper>
}

export default VehiclesTable;

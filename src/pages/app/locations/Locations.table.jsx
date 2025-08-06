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

const Paper = styled(MuiPaper)(spacing);

const columns = [
  { field: "name", headerName: "Name", width: 200 },
  {
    field: "town",
    headerName: "Localidad",
    width: 300,
  },
  {
    field: "address",
    headerName: "Direccion",
    flex: 1,
    valueGetter: (value, row) => row.complementaryAddress? [value, row.complementaryAddress].join(', ') : value
  },
  {
    field: "postalCode",
    headerName: "Codigo postal",
    width: 150,
  },
  {
    field: "country",
    headerName: "Pais",
    width: 150,
  },
];

const rows = [
  { id: 1, name: 'Oficina Principal', country: "España", postalCode: '35480', town: 'Agaete', spainTownCode: 35001, address: 'Urb. El Turmán, 72', complementaryAddress: 'Residencial El Roque' },
  { id: 2, name: 'Oficina Triana', country: "España", postalCode: '35001', town: 'Las Palmas de Gran Canaria', spainTownCode: 35001, address: 'Calle Triana, 35', complementaryAddress: '' },
  { id: 3, name: 'Taller Guanarteme', country: "España", postalCode: '35010', town: 'Las Palmas de Gran Canaria', spainTownCode: 35001, address: 'c/ Guanarteme, 120', complementaryAddress: null },
];

function LocationsTable () {
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
    />
  </Paper>
}

export default LocationsTable;

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
  {
    field: "contract.reference",
    headerName: "Contrato",
    width: 150,
    valueGetter: (value, row) => row.contract.reference
  },
  {
    field: "vehicle.licensePlate",
    headerName: "Vehiculo",
    width: 150,
    valueGetter: (value, row) => row.vehicle.licensePlate
  },
  {
    field: "drivers",
    headerName: "Conductores",
    flex: 1,
    valueGetter: (value, row) => row.principalDriver.name + (row.secondaryDrivers.length ? ` (+${row.secondaryDrivers.length})` : ''),
  },
  {
    field: "contract.deliveryDate",
    headerName: "Fecha entrega",
    width: 150,
    valueGetter: (value, row) => row.contract.deliveryDate
  },
  {
    field: "contract.returnDate",
    headerName: "Fecha devolucion",
    width: 150,
    valueGetter: (value, row) => row.contract.returnDate
  },
];

const location = { id: 1, name: 'Oficina Principal', country: "España", postalCode: '35480', town: 'Agaete', spainTownCode: 35001, address: 'Urb. El Turmán, 72', complementaryAddress: 'Residencial El Roque' };
const payment = { type: 'Credit Card', date: '18/06/2025', mean: '123 456 789', expiration: '09/29', holder: 'Jose Carlos Cabrera Diepa'  };
const persons = [
  { id: 1, name: 'Jose Carlos Cabrera Diepa', identityDocumentNumber: '54088898M', identityDocumentType: 'DNI' },
  { id: 2, name: 'Ramón Garcia Garcia', identityDocumentNumber: '11122223M', identityDocumentType: 'DNI' },
];
const vehicle = { id: 1, licensePlate: '0000ABC', model: 'Polo', brand: "VolksWagen", type: 'Tourism', category: 'Suv', chassisNumber: '12345678901233', color: 'red' };

const rows = [
  {
    id: 1,
    contract: { id: 1, reference: 'C00001', date: '18/06/2025', deliveryLocation: location, returnLocation: location, deliveryDate: '18/06/2025', returnDate: '20/06/2025', payment: { } },
    vehicle,
    principalDriver: persons[0],
    secondaryDrivers: [
      persons[1]
    ]
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
    />
  </Paper>
}

export default VehiclesTable;

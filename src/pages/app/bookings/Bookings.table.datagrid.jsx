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
  { field: "licensePlate", headerName: "Matricula", width: 200 },
  {
    field: "model",
    headerName: "Modelo",
    flex: 1,
    // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    renderCell: ({ value, row }) => (`${row.brand} | ${value}`)
  },
  {
    field: "status",
    headerName: "Estado",
    width: 200,
  },
  {
    field: "year",
    headerName: "Año",
    type: "number",
    width: 150,
  }
];

const rows = [
  { id: 1, licensePlate: '0000ABC', model: 'Polo', brand: "VolksWagen", status: 'On booking', year: 2019  },
  { id: 2, licensePlate: '0000ABC', model: 'Polo', brand: "VolksWagen", status: 'On booking', year: 2019  },
  { id: 3, licensePlate: '0000ABC', model: 'Polo', brand: "VolksWagen", status: 'On booking', year: 2019  },
  { id: 4, licensePlate: '0000ABC', model: 'Polo', brand: "VolksWagen", status: 'On booking', year: 2019  },
  { id: 5, licensePlate: '0000ABC', model: 'Polo', brand: "VolksWagen", status: 'On booking', year: 2019  },
  { id: 6, licensePlate: '0000ABC', model: 'Polo', brand: "VolksWagen", status: 'On booking', year: 2019  },
];

function BookingsTableDatagrid () {
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

export default BookingsTableDatagrid;

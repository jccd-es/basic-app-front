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
import UsersTable from "./Users.table.jsx";

const Divider = styled(MuiDivider)(spacing);

function Index() {
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
          <div>
            <Button variant="contained" color="primary">
              <AddIcon />
              New User
            </Button>
          </div>
        </Grid>
      </Grid>
      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid size={12}>
          <UsersTable />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Index;

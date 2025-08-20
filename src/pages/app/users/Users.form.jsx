import React from "react";
import styled from "@emotion/styled";
import {NavLink, useParams} from "react-router-dom";
import { Helmet } from "react-helmet-async";
import UserForm from "@/components/users/UserForm.jsx";
import {
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  Typography,
  Grid,
  Divider as MuiDivider, Paper, Alert,
} from "@mui/material";
import { spacing } from "@mui/system";
import useUsers from "@/hooks/useUsers.js";

const Divider = styled(MuiDivider)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

function UsersForm() {
  const { id : userId} = useParams();
  const { users, loading, error, refetch } = useUsers();

  const user = users.find(user => user.id == userId);

  return (
    <React.Fragment>
      <Helmet title="User Form" />
      <Grid justifyContent="space-between" container spacing={10}>
        <Grid>

          <Typography variant="h3" gutterBottom display="inline">
            User
          </Typography>
          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Typography>Settings</Typography>
            <Link component={NavLink} to="/app/settings/users">
              Users
            </Link>
            <Typography>User</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid>
          {/* Acciones */}
        </Grid>
      </Grid>
      <Divider my={6} />
      { (!user && userId !== 'new') &&
        <Alert severity="error" sx={{ mb: 6 }} >
          Usuario no encontrado.
        </Alert>
      }
      { (user || userId === 'new') &&
        <Paper p={6}>
          <UserForm user={user}  />
        </Paper>
      }


    </React.Fragment>
  );
}

export default UsersForm;

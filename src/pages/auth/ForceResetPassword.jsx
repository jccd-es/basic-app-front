import React from "react";
import { Helmet } from "react-helmet-async";

import { Typography } from "@mui/material";

import ForceResetPasswordComponent from "@/components/auth/ForceResetPassword";

function ForceResetPassword() {
  return (
    <React.Fragment>
      <Helmet title="Reset Password" />

      <Typography component="h1" variant="h3" align="center" gutterBottom>
        Cambiar Contraseña
      </Typography>
      <Typography component="h2" variant="subtitle1" align="center">
        Ingresa tu nueva contraseña
      </Typography>

      <ForceResetPasswordComponent />
    </React.Fragment>
  );
}

export default ForceResetPassword; 
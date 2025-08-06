import React from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import {
  CardContent,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Paper as MuiPaper,
  TextField as MuiTextField,
  Typography, Alert, AlertTitle, Button
} from "@mui/material";
import { spacing } from "@mui/system";

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const TextFieldSpacing = styled(MuiTextField)(spacing);

const TextField = styled(TextFieldSpacing)`
  width: 200px;
`;


function SesSettings() {
  return (
    <React.Fragment>
      <Helmet title="SH Configuracion" />
      <Typography variant="h3" gutterBottom>
        Configuracion
      </Typography>
      <Typography variant="h4" gutterBottom>
        SES HOSPEDAJES
      </Typography>
      <Divider my={6} />
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Configuración de SES Hospedajes
          </Typography>
          <Typography variant="body2" gutterBottom>
            Complete los campos para realizar la conexion con el servicio de SES Hospedajes del Ministerio del Interior.
          </Typography>
          <Paper mt={3}>
            <form noValidate autoComplete="off">
              <TextField
                mb={4}
                required
                id="name"
                label="Nombre"
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <br />
              <TextField
                mb={4}
                required
                id="password"
                label="Contraseña"
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <br />
              <Button onClick={()=>console.log('Abrir soporte')} variant={'contained'} type={'submit'} size={'large'}>Guardar Configuracion</Button>
            </form>
          </Paper>
        </CardContent>
      </Card>
      <Alert variant={'outlined'} severity={'info'}>
        <AlertTitle>¿Necesitas ayuda?</AlertTitle>
        Sigue estas <Link to={'/help/ses-hospedajes'}>instrucciones</Link> para configurar la conexion con SES Hospedajes o solicita una cita para que nuestro equipo te ayude a conseguirlo.<br />
        <Button sx={{ mt: 3 }} onClick={()=>console.log('Abrir soporte')} variant={'contained'} color={'info'}>Ver instrucciones</Button>
        <Button sx={{ mt: 3, ml: 2 }} onClick={()=>console.log('Abrir soporte')} variant={'outlined'} color={'info'}>Solicitar cita</Button>
      </Alert>
    </React.Fragment>
  );
}

export default SesSettings;

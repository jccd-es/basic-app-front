import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import styled from "@emotion/styled";
import * as Yup from "yup";
import { Formik } from "formik";

import {
  Alert as MuiAlert,
  Button as MuiButton,
  TextField as MuiTextField,
  Typography as MuiTypography,
  Link,
} from "@mui/material";
import { spacing } from "@mui/system";

import useAuth from "@/hooks/useAuth";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Button = styled(MuiButton)(spacing);

const Centered = styled(MuiTypography)`
  text-align: center;
`;

function ForceResetPassword() {
  const { token } = useParams();
  const { forceResetPassword } = useAuth();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Debe ser un email válido")
          .max(255)
          .required("Email es requerido"),
        password: Yup.string()
          .min(8, "La contraseña debe tener al menos 8 caracteres")
          .max(255)
          .required("Contraseña es requerida"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
          .required("Confirmar contraseña es requerido"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
        try {
          const result = await forceResetPassword(token, values.email, values.password);
          
          // Mostrar mensaje de éxito
          setStatus({ 
            success: true, 
            message: "¡Contraseña cambiada exitosamente! Ya puedes iniciar sesión con tu nueva contraseña." 
          });
          
          // Limpiar el formulario
          resetForm();
          setSubmitting(false);
        } catch (error) {
          const message = error.message || "Algo salió mal";

          setStatus({ success: false });
          setErrors({ submit: message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
        status,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          {/* Mensaje de éxito */}
          {status?.success && (
            <Alert mt={2} mb={3} severity="success">
              {status.message}
            </Alert>
          )}
          
          {/* Mensaje de error */}
          {errors.submit && (
            <Alert mt={2} mb={3} severity="warning">
              {errors.submit}
            </Alert>
          )}
          
          <TextField
            type="email"
            name="email"
            label="Email"
            value={values.email}
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            onBlur={handleBlur}
            onChange={handleChange}
            my={3}
          />
          <TextField
            type="password"
            name="password"
            label="Nueva contraseña"
            value={values.password}
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            onBlur={handleBlur}
            onChange={handleChange}
            my={3}
          />
          <TextField
            type="password"
            name="confirmPassword"
            label="Confirmar nueva contraseña"
            value={values.confirmPassword}
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            fullWidth
            helperText={touched.confirmPassword && errors.confirmPassword}
            onBlur={handleBlur}
            onChange={handleChange}
            my={3}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            mb={3}
          >
            {isSubmitting ? "Cambiando..." : "Cambiar contraseña"}
          </Button>
          <Centered>
            <Link to="../sign-in" component={RouterLink}>
              Volver al login
            </Link>
          </Centered>
        </form>
      )}
    </Formik>
  );
}

export default ForceResetPassword; 
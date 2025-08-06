import React from "react";
import { Link as RouterLink } from "react-router-dom";
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

function ResetPassword() {
  const { resetPassword } = useAuth();

  return (
    <Formik
      initialValues={{
        email: "",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
        try {
          const result = await resetPassword(values.email);
          
          // Mostrar mensaje de éxito
          setStatus({ 
            success: true, 
            message: "¡Email enviado! Revisa tu bandeja de entrada y sigue las instrucciones para cambiar tu contraseña. Si no lo encuentras, revisa también la carpeta de spam." 
          });
          
          // Limpiar el formulario
          setSubmitting(false);
        } catch (error) {
          const message = error.message || "Something went wrong";

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
            label="Email Address"
            value={values.email}
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
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
            {isSubmitting ? "Sending..." : "Reset password"}
          </Button>
          <Centered>
            Remember your password?{" "}
            <Link to="../sign-in" component={RouterLink}>
              Log in
            </Link>
          </Centered>
          <Centered>
            ¿Aún no tienes cuenta?{" "}
            {/*<Link to="../sign-up" component={RouterLink} >*/}
            {/*  Sign up*/}
            {/*</Link>*/}
            <Link to="" component={RouterLink} sx={{ textDecoration: 'line-through'}} >
              Registrate
            </Link>
          </Centered>
        </form>
      )}
    </Formik>
  );
}

export default ResetPassword;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { useTranslation } from 'react-i18next';

import {
  Alert as MuiAlert,
  Button as MuiButton,
  TextField as MuiTextField,
  Select as MuiSelect,
  Typography,
  Link,
  Card as MuiCard,
  CardContent, AlertTitle, Box, FormControl, InputLabel, FormHelperText, MenuItem, Divider,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  KeyRoundIcon,
  Trash2Icon
} from "lucide-react";

import { spacing } from "@mui/system";

import useUsers from "@/hooks/useUsers.js";
import useRoles from "@/hooks/useRoles.js";

const Card = styled(MuiCard)(spacing);

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Button = styled(MuiButton)(spacing);

const Select = styled(MuiSelect)(spacing);

const Centered = styled(Typography)`
  text-align: center;
`;

function UserForm({ user }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { createUser, updateUser, deleteUser } = useUsers();
  const { roles, loading: rolesLoading, error: rolesError } = useRoles();
  
  // Estado para el diálogo de confirmación de eliminación
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  // Check if current user has a protected role
  const hasProtectedRole = user?.role.protected_type;
  
  // Filter available roles
  const getAvailableRoles = () => {
    if (!roles || roles.length === 0) return [];
    
    if (hasProtectedRole) {
      // If user has protected role, only show their current role
      return roles.filter(role => role.id === user.role.id);
    } else {
      // If user doesn't have protected role, show all except protected ones
      return roles.filter(role => !role.protected_type );
    }
  };

  const availableRoles = getAvailableRoles();
  const isRoleSelectorDisabled = rolesLoading || hasProtectedRole;

  // Funciones para manejar la eliminación
  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (!user?.id) return;
    
    try {
      setDeleting(true);
      await deleteUser(user.id);
      setDeleteDialogOpen(false);
      navigate("/app/settings/users");
    } catch (error) {
      console.error('Error deleting user:', error);
      // El error ya se maneja en el hook useUsers
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          name: user?.name || "",
          email: user?.email || "",
          roleId: user?.role?.id || "",
          password: "",
          confirmPassword: "",
          submit: false,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required("Name is required"),
          // lastName: Yup.string().max(255).required("Last name is required"),
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          roleId: Yup.string().required("Role is required"),
          password: user?.id 
            ? Yup.string()
                .min(8, "Password must be at least 8 characters")
                .max(255, "Password must be less than 255 characters")
            : Yup.string()
                .min(8, "Password must be at least 8 characters")
                .max(255, "Password must be less than 255 characters")
                .required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .when('password', {
              is: (password) => password && password.length > 0,
              then: (schema) => schema.required('Please confirm your password'),
              otherwise: (schema) => schema
            })
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const userData = {
              name: values.name,
              email: values.email,
              roleId: values.roleId
            };

            // Solo incluir password si se ha proporcionado
            if (values.password && values.password.trim() !== '') {
              userData.password = values.password;
            }

            if (user?.id) {
              await updateUser(user.id, userData);
            } else {
              await createUser(userData);
            }
            navigate("/app/settings/users");
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
          }) => (
          <Card mb={6}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Information
              </Typography>

              <form noValidate onSubmit={handleSubmit}>
                {errors.submit && (
                  <Alert mt={2} mb={1} severity="warning">
                    {errors.submit}
                  </Alert>
                )}
                <TextField
                  type="text"
                  name="name"
                  label="Name"
                  value={values.name}
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  my={3}
                />
                {/*<TextField*/}
                {/*  type="text"*/}
                {/*  name="lastName"*/}
                {/*  label="Last name"*/}
                {/*  value={values.lastName}*/}
                {/*  error={Boolean(touched.lastName && errors.lastName)}*/}
                {/*  fullWidth*/}
                {/*  helperText={touched.lastName && errors.lastName}*/}
                {/*  onBlur={handleBlur}*/}
                {/*  onChange={handleChange}*/}
                {/*  my={3}*/}
                {/*/>*/}
                <TextField
                  type="email"
                  name="email"
                  label="Email address"
                  value={values.email}
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  my={3}
                />
                <FormControl
                  fullWidth
                  error={Boolean(touched.roleId && errors.roleId)}
                  sx={{ my: 3 }}
                >
                  <InputLabel>Role</InputLabel>
                  <Select
                    name="roleId"
                    value={values.roleId}
                    label="Role"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={isRoleSelectorDisabled}
                  >
                    {rolesLoading && (
                      <MenuItem disabled>
                        Loading roles...
                      </MenuItem>
                    )}
                    {!rolesLoading && availableRoles.length === 0 && (
                      <MenuItem disabled>
                        {hasProtectedRole ? "Protected role - not modifiable" : "No roles available"}
                      </MenuItem>
                    )}
                    {!rolesLoading && availableRoles.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.roleId && errors.roleId && (
                    <FormHelperText>{errors.roleId}</FormHelperText>
                  )}
                  {rolesError && (
                    <FormHelperText>Error loading roles: {rolesError}</FormHelperText>
                  )}
                  {hasProtectedRole && (
                    <FormHelperText>
                      This user has a protected role that cannot be modified for security reasons.
                    </FormHelperText>
                  )}
                </FormControl>
                <TextField
                  type="password"
                  name="password"
                  label={user?.id ? "New Password (optional)" : "Password"}
                  value={values.password}
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  my={3}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyRoundIcon size={20} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  value={values.confirmPassword}
                  error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                  fullWidth
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  my={3}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyRoundIcon size={20} />
                      </InputAdornment>
                    ),
                  }}
                />
                {user?.id && (
                  <Alert my={3} severity="info" icon={<KeyRoundIcon />}>
                    <AlertTitle>Password Change</AlertTitle>
                    Leave password fields empty to keep the current password. Fill them to set a new password.
                  </Alert>
                )}
                <Box mt={6} display="flex" justifyContent="space-between">
                  {user?.id && (
                    <Button
                      variant="outlined"
                      color="error"
                      disabled={isSubmitting || deleting}
                      startIcon={<Trash2Icon size={15} />}
                      onClick={handleDeleteClick}
                    >
                      {deleting ? 'Eliminando...' : 'Eliminar Usuario'}
                    </Button>
                  )}
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    sx={!user?.id ? { ml: 'auto' } : {}}
                  >
                    {user?.id ? 'Guardar Cambios' : 'Crear Usuario'}
                  </Button>
                </Box>
              </form>

            </CardContent>
          </Card>
        )}
      </Formik>

      {/* Diálogo de confirmación para eliminar usuario */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-user-dialog-title"
        aria-describedby="delete-user-dialog-description"
      >
        <DialogTitle id="delete-user-dialog-title">
          Confirmar Eliminación
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-user-dialog-description">
            ¿Estás seguro de que quieres eliminar al usuario <strong>{user?.name}</strong>? 
            Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleDeleteCancel} 
            disabled={deleting}
            color="primary"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            disabled={deleting}
            color="error"
            variant="contained"
            startIcon={<Trash2Icon size={15} />}
          >
            {deleting ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserForm;

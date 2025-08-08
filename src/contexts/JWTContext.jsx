import React, { createContext, useEffect, useReducer } from "react";

import axios from "@/utils/axios";
import { isValidToken, setSession } from "@/utils/jwt";

// Note: If you're trying to connect JWT to your own backend, don't forget
// to remove the Axios mocks in the `/src/index.js` file.

const INITIALIZE = "INITIALIZE";
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";
const SIGN_UP = "SIGN_UP";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const JWTReducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case SIGN_UP:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get("/api/auth/my-account");
          const { user } = response.data;

          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const signIn = async (email, password) => {
    try {
      const response = await axios.post("/api/auth/sign-in", {
        email,
        password,
      });
      
      const { success, accessToken, user } = response.data;
      
      // Verificar si el login fue exitoso
      if (!success) {
        throw new Error(response.data.message || "Login failed");
      }
      
      // Verificar que tenemos los datos necesarios
      if (!accessToken || !user) {
        throw new Error("Invalid response from server");
      }

      setSession(accessToken);
      dispatch({
        type: SIGN_IN,
        payload: {
          user,
        },
      });
    } catch (error) {
      // Si es un error de axios (HTTP error)
      if (error.response) {
        const errorMessage = error.response.data?.message || 
                           error.response.data?.error || 
                           `HTTP ${error.response.status}: ${error.response.statusText}`;
        throw new Error(errorMessage);
      }
      
      // Si es un error de red o otro tipo
      throw error;
    }
  };

  const signOut = async () => {
    setSession(null);
    dispatch({ type: SIGN_OUT });
  };

  const signUp = async (email, password, name /*, lastName*/) => {
    try {
      const response = await axios.post("/api/auth/sign-up", {
        email,
        password,
        name,
        // lastName,
      });
      
      const { success, accessToken, user } = response.data;
      
      // Verificar si el registro fue exitoso
      if (!success) {
        throw new Error(response.data.message || "Registration failed");
      }
      
      // Verificar que tenemos los datos necesarios
      if (!accessToken || !user) {
        throw new Error("Invalid response from server");
      }

      setSession(accessToken);
      dispatch({
        type: SIGN_UP,
        payload: {
          user,
        },
      });
    } catch (error) {
      // Si es un error de axios (HTTP error)
      if (error.response) {
        const errorMessage = error.response.data?.message || 
                           error.response.data?.error || 
                           `HTTP ${error.response.status}: ${error.response.statusText}`;
        throw new Error(errorMessage);
      }
      
      // Si es un error de red o otro tipo
      throw error;
    }
  };

  const resetPassword = async (email) => {
    try {
      const response = await axios.post("/api/auth/reset-password", {
        email,
      });
      
      const { success } = response.data;
      
      // Verificar si el reset fue exitoso
      if (!success) {
        throw new Error(response.data.message || "Password reset failed");
      }
      
      return { success: true, message: response.data.message || "Password reset email sent successfully" };
    } catch (error) {
      // Si es un error de axios (HTTP error)
      if (error.response) {
        const errorMessage = error.response.data?.message || 
                           error.response.data?.error || 
                           `HTTP ${error.response.status}: ${error.response.statusText}`;
        throw new Error(errorMessage);
      }
      
      // Si es un error de red o otro tipo
      throw error;
    }
  };

  const forceResetPassword = async (token, email, password) => {
    try {
      const response = await axios.post("/api/auth/force-reset-password", {
        email,
        password,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const { success } = response.data;
      
      // Verificar si el reset fue exitoso
      if (!success) {
        throw new Error(response.data.message || "Password reset failed");
      }
      
      return { success: true, message: response.data.message || "Password changed successfully" };
    } catch (error) {
      // Si es un error de axios (HTTP error)
      if (error.response) {
        const errorMessage = error.response.data?.message || 
                           error.response.data?.error || 
                           `HTTP ${error.response.status}: ${error.response.statusText}`;
        throw new Error(errorMessage);
      }
      
      // Si es un error de red o otro tipo
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        signIn,
        signOut,
        signUp,
        resetPassword,
        forceResetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  es: {
    translation: {
      Search: "Buscar",
      "Welcome back": "Bienvenido de nuevo",
      "We've missed you": "Te hemos extrañado",
      "The simplest and fastest way to build your next MUI dashboard or app.": "El camino más sencillo y rápido para construir tu próximo dashboard MUI o aplicación.",
      "Mira comes with hundreds of UI elements, forms, tables, charts, pages and icons that helps you to create your web apps or applications faster.": "Mira viene con cientos de elementos de interfaz de usuario, formularios, tablas, gráficos, páginas y símbolos que te ayudan a crear tus aplicaciones web o aplicaciones más rápidamente.",
      "Register now": "Regístrate ahora",
      "Login": "Iniciar sesión",
      "Documentation": "Documentación",
      "Reservas": "Reservas",
      "Alquileres": "Alquileres",
      "Vehiculos": "Vehiculos",
      "Equipo": "Equipo",
      "Organizacion": "Organizacion",
      "Suscripcion": "Suscripcion",
      "Notificaciones": "Notificaciones",
      "Sign In": "Acceder",
      "Sign Up": "Registrarse",
    },
  },
  en: {
    translation: {
      Search: "Search",
      "Welcome back": "Welcome back",
      "We've missed you": "We've missed you",
      "The simplest and fastest way to build your next MUI dashboard or app.": "The simplest and fastest way to build your next MUI dashboard or app.",
      "Mira comes with hundreds of UI elements, forms, tables, charts, pages and icons that helps you to create your web apps or applications faster.": "Mira comes with hundreds of UI elements, forms, tables, charts, pages and icons that helps you to create your web apps or applications faster.",
      "Register now": "Register now",
      "Login": "Login",
      "Documentation": "Documentation",
      "Reservas": "Bookings",
      "Alquileres": "Index",
      "Vehiculos": "Vehicles",
      "Equipo": "Team",
      "Organizacion": "Organization",
      "Suscripcion": "Subscription",
      "Notificaciones": "Notifications",
      "Sign In": "Sign In",
      "Sign Up": "Sign Up",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es",
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
});

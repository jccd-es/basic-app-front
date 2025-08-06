import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { green } from "@mui/material/colors";

import {
  Avatar,
  Badge,
  Divider,
  Tooltip,
  Menu,
  MenuItem,
  IconButton as MuiIconButton,
} from "@mui/material";
import { spacing } from "@mui/system";

import useAuth from "@/hooks/useAuth";

const IconButton = styled(MuiIconButton)`
  ${spacing};

  &:hover {
    background-color: transparent;
  }
`;

const AvatarBadge = styled(Badge)`
  margin-right: ${(props) => props.theme.spacing(1)};
  span {
    background-color: ${() => green[400]};
    border: 2px solid ${(props) => props.theme.palette.background.paper};
    height: 12px;
    width: 12px;
    border-radius: 50%;
  }
`;

function NavbarUserDropdown() {
  const [anchorMenu, setAnchorMenu] = React.useState(null);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth/sign-in");
  };

  // Función para obtener las iniciales del usuario
  const getUserInitials = (user) => {
    if (!user || !user.displayName) return "U";
    
    const names = user.displayName.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return user.displayName[0].toUpperCase();
  };

  // Función para obtener el nombre para el tooltip
  const getTooltipTitle = (user) => {
    if (!user) return "Usuario no conectado";
    return user.displayName || user.email || "Usuario conectado";
  };

  return (
    <React.Fragment>
      <Tooltip title={getTooltipTitle(user)}>
        <IconButton
          aria-owns={anchorMenu ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="inherit"
          p={0}
          mx={1}
        >
          <AvatarBadge
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
          >
            <Avatar
              alt={user?.displayName || "Usuario"}
              src={user?.avatar}
              sx={{ bgcolor: 'primary.main' }}
            >
              {/*{getUserInitials(user)}*/}
            </Avatar>
          </AvatarBadge>
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
      >
        {user && (
          <MenuItem disabled>
            {user.displayName || user.email || "Usuario"}
          </MenuItem>
        )}
        {user && <Divider />}
        {/*<MenuItem onClick={closeMenu}>Profile</MenuItem>*/}
        {/*<MenuItem onClick={closeMenu}>Settings & Privacy</MenuItem>*/}
        {/*<Divider />*/}
        {/*<MenuItem onClick={closeMenu}>Help</MenuItem>*/}
        <MenuItem onClick={handleSignOut}>Salir</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default NavbarUserDropdown;

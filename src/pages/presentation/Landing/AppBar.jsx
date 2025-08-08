import React from "react";
import styled from "@emotion/styled";
import { spacing } from "@mui/system";
import { Link } from "react-router-dom";

import {
  AppBar,
  Button as MuiButton,
  Container,
  Grid,
  Box,
  Toolbar,
} from "@mui/material";

import { ReactComponent as Logo } from "@/vendor/logo.svg";
import NavbarLanguagesDropdown from "@/components/navbar/NavbarLanguagesDropdown.jsx";
import { useTranslation } from 'react-i18next';
import {Link as RouterLink} from "react-router";

const Button = styled(MuiButton)(spacing);

const Brand = styled.div`
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  font-family: ${(props) => props.theme.typography.fontFamily};
`;

const BrandIcon = styled(Logo)`
  margin-right: ${(props) => props.theme.spacing(2)};
  margin-top: -2px;
  color: ${(props) => props.theme.palette.primary.main};
  fill: ${(props) => props.theme.palette.primary.main};
  width: 32px;
  height: 32px;

  vertical-align: middle;
  display: inline;
`;

const AppBarComponent = () => {
  const { t } = useTranslation();
  
  return (
    <React.Fragment>
      <AppBar position="relative" color="transparent" elevation={0}>
        <Toolbar>
          <Container>
            <Grid container alignItems="center">
              <Grid>
                <Link to="/" component={RouterLink} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Brand>
                    <BrandIcon /> Admin Dashboard
                  </Brand>
                </Link>
              </Grid>
              <Grid size="grow" />
              <Grid>
                <Box sx={{ display: { xs: "none", md: "inline-block" } }}>
                  {/*<Button*/}
                  {/*  ml={2}*/}
                  {/*  color="inherit"*/}
                  {/*  component={Link}*/}
                  {/*  to="/dashboard/analytics"*/}
                  {/*  target="_blank"*/}
                  {/*>*/}
                  {/*  Live Preview*/}
                  {/*</Button>*/}
                  {/*<Button*/}
                  {/*  ml={2}*/}
                  {/*  color="inherit"*/}
                  {/*  component={Link}*/}
                  {/*  to="/documentation/welcome"*/}
                  {/*  target="_blank"*/}
                  {/*>*/}
                  {/*  {t("Documentation")}*/}
                  {/*</Button>*/}
                  <Button
                    ml={2}
                    // color="inherit"
                    color="primary"
                    variant="contained"
                    component={Link}
                    to="/auth/sign-in"
                  >
                    {t("Sign In")}
                  </Button>
                </Box>
                <Button
                  ml={2}
                  color="primary"
                  variant="contained"
                  component={Link}
                  to="/auth/sign-up"
                >
                  {t("Sign Up")}
                </Button>
                {/*<NavbarLanguagesDropdown />*/}
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
};

export default AppBarComponent;

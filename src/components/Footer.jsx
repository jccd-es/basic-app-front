import React from "react";
import styled from "@emotion/styled";

import {
  Grid,
  List,
  ListItemText as MuiListItemText,
  ListItemButton as MuiListItemButton,
} from "@mui/material";

const Wrapper = styled.div`
  padding: ${(props) => props.theme.spacing(0.25)}
    ${(props) => props.theme.spacing(4)};
  background: ${(props) => props.theme.footer.background};
  position: relative;
`;

const ListItemButton = styled(MuiListItemButton)`
  display: inline-block;
  width: auto;
  padding-left: ${(props) => props.theme.spacing(2)};
  padding-right: ${(props) => props.theme.spacing(2)};

  &,
  &:hover,
  &:active {
    color: #ff0000;
  }
`;

const ListItemText = styled(MuiListItemText)`
  span {
    color: ${(props) => props.theme.footer.color};
  }
`;

function Footer() {
  return (
    <Wrapper>
      <Grid container spacing={0}>
        <Grid
          sx={{ display: { xs: "none", md: "block" } }}
          container
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <List>
            <ListItemButton component="a" href="#">
              <ListItemText primary="Support" />
            </ListItemButton>
            <ListItemButton component="a" href="#">
              <ListItemText primary="Help Center" />
            </ListItemButton>
            <ListItemButton component="a" href="#">
              <ListItemText primary="Privacy" />
            </ListItemButton>
            <ListItemButton component="a" href="#">
              <ListItemText primary="Terms of Service" />
            </ListItemButton>
          </List>
        </Grid>
        <Grid
          container
          justifyContent="flex-end"
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <List>
            <ListItemButton target={'_blank'} href={'https://jccd.es'}>
              <ListItemText primary={`© ${new Date().getFullYear()} - JCCD.ES`} />
            </ListItemButton>
          </List>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

export default Footer;

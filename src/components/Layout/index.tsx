import React, { ComponentElement } from 'react';
import { Grid, AppBar } from '@material-ui/core';

import Navigation from '../Navigation';

interface Props {
  children: ComponentElement<any, any>;
}

const Layout = ({ children }: Props) => {
  return (
    <Grid container direction="column" style={{ minHeight: '100vh' }} alignItems="center">
      <Navigation />
      <Grid item style={{ flex: 1, marginTop: '10px' }} md={9}>
        {children}
      </Grid>
      <AppBar position="static"> </AppBar>
    </Grid>
  );
};

export default Layout;

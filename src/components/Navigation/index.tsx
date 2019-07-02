import React, { forwardRef } from 'react';
import { AppBar, Link } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { capitalize } from 'lodash';

import styles from './Navigation.module.scss';

const routeUrls = ['/users', '/books'];

const NavLinkWrapper = forwardRef((props: any, ref) => (
  <span>
    <NavLink {...props} />
  </span>
));

const Navigation = () => {
  return (
    <AppBar
      position="static"
      style={{ display: 'flex', flexDirection: 'row', minHeight: '30px', alignItems: 'center ' }}
    >
      {routeUrls.map(url => (
        <div key={url} className={styles.navItem}>
          <Link
            component={NavLinkWrapper}
            to={url}
            className={styles.link}
            activeClassName={styles.active}
            color="inherit"
          >
            {capitalize(url.replace(/\//, ''))}
          </Link>
        </div>
      ))}
    </AppBar>
  );
};

export default Navigation;

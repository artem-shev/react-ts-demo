import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import BooksList from './Books';
import UsersList from './Users';

const configs: { path: string; component: any }[] = [
  { path: '/books', component: BooksList },
  { path: '/users', component: UsersList },
];

export default function AppRoutes() {
  return (
    <Switch>
      {configs.map(config => (
        <Route {...config} key={config.path} />
      ))}
      <Redirect from="/" to="/users" exact />
    </Switch>
  );
}

import React, { memo } from 'react';

import configureStore from 'state/configureStore';
import AppRoutes from 'routes/routes';
import Layout from 'components/Layout';

import Providers from '../Providers';

const store = configureStore();

const App = memo(() => (
  <Providers store={store}>
    <Layout>
      <AppRoutes />
    </Layout>
  </Providers>
));

export default App;

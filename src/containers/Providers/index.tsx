import { Store } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import React from 'react';

interface Props {
  store: Store;
  children: JSX.Element;
}

const Providers = ({ store, children }: Props) => (
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider>{children}</MuiThemeProvider>
    </BrowserRouter>
  </Provider>
);

export default Providers;

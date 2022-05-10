import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import Routes from './navigation/Routes';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './i18n';
import { ThemeProvider } from '@material-ui/core';
import Theme from './assets/styles/Theme';

ReactDOM.render(
  <Suspense fallback={null}>
    <React.StrictMode>
      <ThemeProvider theme={Theme}>
        <Routes />
      </ThemeProvider>
    </React.StrictMode>
  </Suspense>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

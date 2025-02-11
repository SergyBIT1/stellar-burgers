import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOMClient from 'react-dom/client';
import App from './components/app/app';

import store from './services/store';
import { Provider } from 'react-redux';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

const basename =
  process.env.NODE_ENV === 'production' ? '/stellar-burgers' : '/';

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

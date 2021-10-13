import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppCondominio from './AppCondominio';
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'assets/styles/tailwind.css';

const elRoot = document.getElementById('root');

render(
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <AppCondominio />
    </Auth0ProviderWithHistory>
  </BrowserRouter>,
  elRoot
);

// if (module.hot) {
//   module.hot.accept('./AppCondominio', () => setTimeout(startApp));
// }

//startApp();

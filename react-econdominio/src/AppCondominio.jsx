import { Route, Switch, Redirect } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'assets/styles/tailwind.css';
import 'tailwindcss/dist/tailwind.css';
import 'assets/styles/index.css';
import 'assets/styles/tailwind.css';

// Auth0
import { useAuth0 } from '@auth0/auth0-react';
import ProtectedRoute from './auth/protected-route';

// layouts

import Admin from 'layouts/Admin.js';
import Auth from 'layouts/Auth.js';

// views without layouts

import Landing from 'views/Landing.js';
import Profile from 'views/Profile.js';
import Index from 'views/Index.js';
import Loading from 'components/Auth/loading';

const AppCondominio = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Switch>
      {/* add routes with layouts */}
      <ProtectedRoute path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      {/* add routes without layouts */}
      <Route path="/landing" exact component={Landing} />
      <Route path="/costos" exact component={Landing} />
      <ProtectedRoute path="/profile" exact component={Profile} />
      <Route path="/" exact component={Index} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default AppCondominio;

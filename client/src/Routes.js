import React from 'react';
import { Switch, Route } from 'react-router-dom';
// components
import Home from './components/Home/Home';
import Register_Login from './components/Register_Login/RegisterLogin';
import Register from './components/Register/Register';
import UserDashboard from './components/UserDashboard/UserDashboard';
// HOC imports
import Layout from './hoc/layout';
import Auth from './hoc/auth';

// complete private routes = true, in between private routes = false, completely public = null
// render auth on all components
const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Auth(Home, null)} />
        <Route path="/user/dashboard" exact component={Auth(UserDashboard, true)} />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/register_login" exact component={Auth(Register_Login, false)} />
      </Switch>
    </Layout>
  );
};

export default Routes;

import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import List from '../pages/List';
import Registration from '../pages/Resgistration';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/list" exact component={List} />
    <Route path="/registration" exact component={Registration} />
  </Switch>
);

export default Routes;

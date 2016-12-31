import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router';
import AppLayout from 'components/layout/AppLayout.jsx';
import ConcertList from 'components/concerts/ConcertList.jsx';
import ConcertEditForm from 'components/concerts/ConcertEditForm.jsx';
import ConcertAddForm from 'components/concerts/ConcertAddForm.jsx';
import Deployer from 'components/deployments/Deployer.jsx';

export default function App() {
  return (
    <Router history={hashHistory}>
      <Redirect from="/" to="/concerts" />
      <Route path="/" component={AppLayout}>
        <Route path="/deployment" component={Deployer} />
        <Route path="/concerts" component={ConcertList} />
        <Route path="/concerts/new" component={ConcertAddForm} />
        <Route path="/concerts/:concertId" component={ConcertEditForm} />
      </Route>
    </Router>
  );
}

import React from 'react'
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router'
import AppLayout from 'components/AppLayout.jsx'
import ConcertList from 'components/concerts/ConcertList.jsx'
import ConcertEditPage from 'components/concerts/ConcertEditPage.jsx'

export default class App extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Redirect from='/' to='/concerts' />
        <Route path='/' component={AppLayout}>
          <Route path='/concerts' component={ConcertList} />
          <Route path='/concerts/:concertId' component={ConcertEditPage} />
        </Route>
      </Router>
    )
  }
}
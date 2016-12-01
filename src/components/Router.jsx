import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import AppLayout from './AppLayout.jsx'
import ConcertList from './ConcertList.jsx'

export default class App extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={AppLayout}>
          <IndexRoute component={ConcertList} />
        </Route>
      </Router>
    )
  }
}
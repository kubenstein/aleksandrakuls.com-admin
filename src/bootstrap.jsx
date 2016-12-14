import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppStore from 'store/reducers';
import Router from 'components/Router.jsx';
import fetchConcerts from 'actions/fetch-concerts';

const store = createStore(AppStore);

fetchConcerts(store.dispatch);

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('app')
);

import React  from 'react';
import ReactDOM  from 'react-dom';
import { Router, Route } from 'react-router';
import { createHistory } from 'history';

import NotFound from './components/NotFound';
import App from './components/App';
import Profile from './components/Profile';

var routes = (
  <Router history={createHistory()}>
    <Route path="/" component={App} />
    <Route path="teams/:teamId" component={Profile} />
    <Route path="*" component={NotFound}/>
  </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));

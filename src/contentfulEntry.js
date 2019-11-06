import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import Page from './pages/contentful';
import contentful from './utils/contentful';

const routes = contentful
  .getRoutes()
  .then(routes => {
    ReactDOM.render(
      <BrowserRouter>
        <Switch>
          {routes.map(path =>
            <Route key={path} path={'/' + path + '/'}>
              <Page />
            </Route>
          )}
        </Switch>
      </BrowserRouter>
    , document.getElementById('app'));
  })
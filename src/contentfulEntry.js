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
          {routes.map(({fields: {slug}}, index) =>
            <Route key={slug} path={'/' + slug + '/'}>
              <Page lessonNum={index+1} />
            </Route>
          )}
        </Switch>
      </BrowserRouter>
    , document.getElementById('app'));
  })
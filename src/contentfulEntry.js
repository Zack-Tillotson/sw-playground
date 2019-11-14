import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

import Page from './pages/contentful';
import HomePage from './pages/contentfulHomePage'
import contentful from './utils/contentful';

const routes = contentful
  .getRoutes()
  .then(routes => {
    ReactDOM.render(
      <BrowserRouter>
        <Switch>
          {routes.map(({fields: {slug}}, index) => {
            let path = '/';
            if(slug) path += `${slug}/`;

            switch(path) {
              case '/': {
                return (
                  <Route key={slug} exact path={path}>
                    <HomePage lessonNum={index} />
                  </Route>
                );
              }
              default: {
                return (
                  <Route key={slug} exact path={path}>
                    <Page lessonNum={index} />
                  </Route>
                );
              }
            }
          })}
        </Switch>
      </BrowserRouter>
    , document.getElementById('app'));
  })
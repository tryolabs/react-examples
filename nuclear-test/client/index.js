'use strict';

import React from 'react';
import Router from 'react-router';

import routes from './routes';

import './stylesheets/app.css';


Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root />, document.body);
});

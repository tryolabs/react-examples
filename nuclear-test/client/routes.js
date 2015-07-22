'use strict';

import React from 'react';
import Router from 'react-router';

import {App} from './components/';
import {ContactsPage, ContactPage, NewContactPage, FavoritesPage} from './pages/';


// declare our routes and their hierarchy
export default (
  <Router.Route handler={App}>
    <Router.Redirect from="/" to="contacts" />

    <Router.Route name="contacts" path="contacts/" handler={ContactsPage} />
    <Router.Route name="new-contact" path="contact/new/"
        handler={NewContactPage} />
    <Router.Route name="contact" path="contact/:contactId/"
        handler={ContactPage} />

    <Router.Route name="favorites" path="favorites/" handler={FavoritesPage} />
  </Router.Route>
);

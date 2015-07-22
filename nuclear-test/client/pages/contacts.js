'use strict';

import React from 'react';
import Router from 'react-router';
import Mixin from 'react-mixin';
import cx from 'classnames';

import {ContactListItem, List} from '../components/';
import reactor from '../reactor';
import {contactsGetter} from  '../getters';
import {ActionCreators} from '../actions';


class ContactsPage extends React.Component {
  getDataBindings() {
    return {
      contacts: contactsGetter
    };
  }

  static willTransitionTo(transition, params, query) {
    ActionCreators.getContacts();
  }

  render() {
    let items = this.state.contacts.toArray().map(contact =>
        <ContactListItem contact={contact} key={contact.get('id')}
            onDelete={this.handleDelete} onFav={this.handleFav} />);
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <Router.Link to="new-contact" className="btn btn-default navbar-btn">
              <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
            </Router.Link>
          </div>
        </nav>
        <List items={items} />
      </div>
    );
  }

  handleDelete(contact) {
    ActionCreators.deleteContact(contact);
  }

  handleFav(contact, fav) {
    if (fav) {
      ActionCreators.favContact(contact);
    } else {
      ActionCreators.unfavContact(contact);
    }

  }
}

Mixin.onClass(ContactsPage, reactor.ReactMixin);


export default ContactsPage;

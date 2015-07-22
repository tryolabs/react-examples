'use strict';

import React from 'react';
import Router from 'react-router';
import Mixin from 'react-mixin';
import cx from 'classnames';

import {ContactListItem, List} from '../components/';
import reactor from '../reactor';
import {favoritesGetter} from  '../getters';
import {ActionCreators} from '../actions';


class FavoritesPage extends React.Component {
  getDataBindings() {
    return {
      contacts: favoritesGetter
    };
  }

  static willTransitionTo(transition, params, query) {
    ActionCreators.getContacts();
  }

  render() {
    let items = this.state.contacts.toArray().map(contact =>
        <ContactListItem contact={contact} key={contact.get('id')}
            onFav={this.handleFav} />);
    return (
      <div>
        <List items={items} />
      </div>
    );
  }

  handleFav(contact, fav) {
    if (fav) {
      ActionCreators.favContact(contact);
    } else {
      ActionCreators.unfavContact(contact);
    }

  }
}

Mixin.onClass(FavoritesPage, reactor.ReactMixin);


export default FavoritesPage;

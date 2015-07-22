'use strict';

import {Store, toImmutable} from 'nuclear-js';

import {Actions} from '../actions';


class ContactStore extends Store {
  getInitialState() {
    return toImmutable({});
  }

  initialize() {
    this.on(Actions.CONTACTS_RECEIVED, this.contactsReceived);
    this.on(Actions.CONTACT_ADDED, this.contactAdded);
    this.on(Actions.CONTACT_DELETED, this.contactDeleted);
    this.on(Actions.CONTACT_FAVED, this.contactFaved);
    this.on(Actions.CONTACT_UNFAVED, this.contactFaved);
  }

  contactsReceived(state, contacts) {
    let contactsMap = {};
    for(let contact of contacts) {
      contactsMap[contact.id] = contact;
    }
    return toImmutable(contactsMap);
  }

  contactAdded(state, contact) {
    let map = {};
    map[contact.id] = contact;
    return state.merge(toImmutable(map));
  }

  contactDeleted(state, contact) {
    return state.delete(contact.id);
  }

  contactFaved(state, contact) {
    let map = {};
    map[contact.id] = contact;
    return state.merge(toImmutable(map));
  }
}


class CurrentContactStore extends Store {
  getInitialState() {
    return null;
  }

  initialize() {
    this.on(Actions.CONTACT_SELECTED, this.contactSelected);
  }

  contactSelected(state, contactId) {
    return contactId;
  }
}


export {
  ContactStore,
  CurrentContactStore
};

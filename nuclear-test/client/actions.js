'use strict';

import reactor from './reactor';
import axios from 'axios';


var actionsNames = [
  'CONTACT_SELECTED',

  'CONTACTS_REQUESTED',
  'CONTACTS_RECEIVED',
  'CONTACTS_RECEIVE_FAILED',

  'CONTACT_ADD_REQUESTED',
  'CONTACT_ADDED',
  'CONTACT_ADD_FAILED',

  'CONTACT_DELETE_REQUESTED',
  'CONTACT_DELETED',
  'CONTACT_DELETE_FAILED',

  'CONTACT_FAV_REQUESTED',
  'CONTACT_FAVED',
  'CONTACT_FAV_FAILED',

  'CONTACT_UNFAV_REQUESTED',
  'CONTACT_UNFAVED',
  'CONTACT_UNFAV_FAILED',

  'MESSAGE_DISMISSED'
];


var Actions = {};

for(let actionName of actionsNames) {
  Actions[actionName] = actionName;
}

function dispatch(action, params) {
  reactor.dispatch(action, params);
}


class ActionCreators {
  static getContacts() {
    axios.get('http://localhost:3000/contacts')
      .then(response => dispatch(Actions.CONTACTS_RECEIVED, response.data))
      .catch(error => dispatch(Actions.CONTACTS_RECEIVE_FAILED, error));
    dispatch(Actions.CONTACTS_REQUESTED);
  }

  static addContact(contact) {
    axios.post('http://localhost:3000/contacts', contact)
      .then(response => dispatch(Actions.CONTACT_ADDED, response.data))
      .catch(error => dispatch(Actions.CONTACT_ADD_FAILED, error));
    dispatch(Actions.CONTACT_ADD_REQUESTED, contact.toJS());
  }

  static deleteContact(contact) {
    axios.delete(`http://localhost:3000/contacts/${contact.get('id')}`)
      .then(response => dispatch(Actions.CONTACT_DELETED, contact.toJS()))
      .catch(error => dispatch(Actions.CONTACT_DELETE_FAILED, contact.toJS()));
    dispatch(Actions.CONTACT_DELETE_REQUESTED, contact.toJS());
  }

  static favContact(contact) {
    axios.patch(`http://localhost:3000/contacts/${contact.get('id')}`,
        {fav: true})
      .then(response => dispatch(Actions.CONTACT_FAVED, response.data))
      .catch(error => dispatch(Actions.CONTACT_FAV_FAILED, contact.toJS()));
    dispatch(Actions.CONTACT_FAV_REQUESTED, contact.toJS());
  }

  static unfavContact(contact) {
    axios.patch(`http://localhost:3000/contacts/${contact.get('id')}`,
        {fav: false})
      .then(response => dispatch(Actions.CONTACT_UNFAVED, response.data))
      .catch(error => dispatch(Actions.CONTACT_UNFAV_FAILED, contact.toJS()));
    dispatch(Actions.CONTACT_UNFAV_REQUESTED, contact.toJS());
  }

  static selectContact(contactId) {
    dispatch(Actions.CONTACT_SELECTED, contactId);
  }

  static dismissMessage(userAction) {
    dispatch(Actions.MESSAGE_DISMISSED, userAction);
  }
};


export {
  Actions,
  ActionCreators
};

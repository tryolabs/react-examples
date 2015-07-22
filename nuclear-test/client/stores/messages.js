'use strict';

import {Store, toImmutable} from 'nuclear-js';

import {Actions} from '../actions';


class MessageStore extends Store {
  getInitialState() {
    return null;
  }

  initialize() {
    this.on(Actions.CONTACTS_REQUESTED, this.contactsRequested);
    this.on(Actions.CONTACTS_RECEIVED, this.contactsReceived);
    this.on(Actions.CONTACTS_RECEIVE_FAILED, this.contactsReceiveFailed);

    this.on(Actions.CONTACT_ADD_REQUESTED, this.contactAddRequested);
    this.on(Actions.CONTACT_ADDED, this.contactAdded);
    this.on(Actions.CONTACT_ADD_FAILED, this.contactAddFailed);

    this.on(Actions.CONTACT_DELETE_REQUESTED, this.contactDeleteRequested);
    this.on(Actions.CONTACT_DELETED, this.contactDeleted);
    this.on(Actions.CONTACT_DELETE_FAILED, this.contactDeleteFailed);

    this.on(Actions.CONTACT_FAV_REQUESTED, this.contactFavRequested);
    this.on(Actions.CONTACT_FAVED, this.contactFaved);
    this.on(Actions.CONTACT_FAV_FAILED, this.contactFavFailed);

    this.on(Actions.CONTACT_UNFAV_REQUESTED, this.contactUnfavRequested);
    this.on(Actions.CONTACT_UNFAVED, this.contactUnfaved);
    this.on(Actions.CONTACT_UNFAV_FAILED, this.contactUnfavFailed);

    this.on(Actions.MESSAGE_DISMISSED, this.messageDismissed);
  }

  contactsRequested(state) {
    return toImmutable({
      type: 'info',
      message: 'Loading contacts...',
    });
  }

  contactsReceived(state, contacts) {
    return null;
  }

  contactsReceiveFailed(state, error) {
    return toImmutable({
      type: 'error',
      message: 'Fail to load contacts',
      timeout: 5
    });
  }

  contactAddRequested(state, contact) {
    return toImmutable({
      type: 'info',
      message: `Adding ${contact.name}`
    });
  }

  contactAdded(state, contact) {
    return toImmutable({
      type: 'success',
      message: 'Contact added',
      timeout: 5
    });
  }

  contactAddFailed(state, error) {
    return toImmutable({
      type: 'error',
      message: 'Failed to add contact',
      timeout: 5
    });
  }

  contactDeleteRequested(state, contact) {
    return toImmutable({
      type: 'info',
      message: `Deleting ${contact.name}`
    });
  }

  contactDeleted(state, contact) {
    return toImmutable({
      type: 'success',
      message: 'Contact deleted',
      timeout: 5
    });
  }

  contactDeleteFailed(state, error) {
    return toImmutable({
      type: 'error',
      message: 'Failed to delete contact',
      timeout: 5
    });
  }

  contactFavRequested(state, contact) {
    return toImmutable({
      type: 'info',
      message: `Faving ${contact.name}`
    });
  }

  contactFaved(state, contact) {
    return toImmutable({
      type: 'success',
      message: `${contact.name} is a favorite`,
      timeout: 5
    });
  }

  contactFavFailed(state, error) {
    return toImmutable({
      type: 'error',
      message: 'Failed to fav',
      timeout: 5
    });
  }

  contactUnfavRequested(state, contact) {
    return toImmutable({
      type: 'info',
      message: `Unfaving ${contact.name}`
    });
  }

  contactUnfaved(state, contact) {
    return toImmutable({
      type: 'success',
      message: `${contact.name} is not a favorite`,
      timeout: 5
    });
  }

  contactUnfavFailed(state, error) {
    return toImmutable({
      type: 'error',
      message: 'Failed to unfav',
      timeout: 5
    });
  }

  messageDismissed(state) {
    return null;
  }
}


export default MessageStore;

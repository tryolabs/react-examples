'use strict';

import React from 'react';
import Mixin from 'react-mixin';

import {Contact} from '../components/';
import reactor from '../reactor';
import {currentContactGetter} from  '../getters';
import {ActionCreators} from '../actions';


class ContactPage extends React.Component {
  getDataBindings() {
    return {
      contact: currentContactGetter
    };
  }

  static willTransitionTo(transition, params, query) {
    ActionCreators.selectContact(parseInt(params.contactId));
    ActionCreators.getContacts();
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <Contact contact={this.state.contact} />
        </div>
      </div>
    );
  }
}

Mixin.onClass(ContactPage, reactor.ReactMixin);


export default ContactPage;

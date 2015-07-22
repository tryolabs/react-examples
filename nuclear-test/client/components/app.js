'use strict'

import React from 'react';
import Router from 'react-router';
import Mixin from 'react-mixin';
import cx from 'classnames';

import reactor from '../reactor';
import {messageGetter} from '../getters';
import {ActionCreators} from '../actions';

import 'bootstrap-sass-loader';


class App extends React.Component {
  getDataBindings() {
    return {
      message: messageGetter
    };
  }

  handleCloseMessage() {
    ActionCreators.dismissMessage(true);
    clearTimeout(this.dismissedId);
  }

  render () {
    let contactsPageActive = this.isActive('contacts') || this.isActive('contact') || this.isActive('new-contact');

    let message;
    if(this.state.message) {
      message = (
        <div className={cx('alert', {
            'alert-info': this.state.message.get('type') === 'info',
            'alert-success': this.state.message.get('type') === 'success',
            'alert-danger': this.state.message.get('type') === 'error'
          })}>
          <button type="button" className="close" aria-label="Close"
              onClick={this.handleCloseMessage.bind(this)}>
            <span aria-hidden="true">&times;</span>
          </button>
          {this.state.message.get('message')}
        </div>
      );
      if(this.state.message.get('timeout')) {
        this.dismissedId = setTimeout(
            () => ActionCreators.dismissMessage(false),
            this.state.message.get('timeout') * 1000);
      }
    }
    return (
      <div>
        <div className="messages">
          {message}
        </div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <span className="navbar-brand">
                NuclearJs Test
              </span>
            </div>
          </div>
        </nav>
        <div className="container-fluid">
          <ul className="nav nav-tabs nav-justified">
            <li role="presentation"
                className={cx({
                  active: contactsPageActive
                })}>
              <Router.Link to="contacts">
                <span className="fa fa-user fa-2x" aria-hidden="true"></span> Contacts
              </Router.Link>
            </li>
            <li role="presentation" className={cx({active: this.isActive('favorites')})}>
              <Router.Link to="favorites">
                <span className="fa fa-star fa-2x" aria-hidden="true"></span> Favorites
              </Router.Link>
            </li>
          </ul>
          <Router.RouteHandler />
        </div>
      </div>
    );
  }
}

Mixin.onClass(App, Router.State);
Mixin.onClass(App, reactor.ReactMixin);

export default App;

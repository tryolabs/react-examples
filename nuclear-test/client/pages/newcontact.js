'use strict';

import React from 'react';
import Addons from 'react/addons';
import Router from 'react-router';
import Mixin from 'react-mixin';

import {ActionCreators} from '../actions';


class NewContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      email: '',
      address: ''
    };
  }

  render() {
    return (
      <div className="container">
        <form className="form-horizontal">
          <div className="form-group">
            <label htmlFor="name" className="col-sm-2 control-label">Name</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="name"
                  placeholder="Name" valueLink={this.linkState('name')} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="col-sm-2 control-label">Email</label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="email"
                  placeholder="username@domain.com" valueLink={this.linkState('email')} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="address" className="col-sm-2 control-label">Address</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="address"
                  placeholder="Address" valueLink={this.linkState('address')} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="col-sm-2 control-label">Phone</label>
            <div className="col-sm-10">
              <input type="tel" className="form-control" id="phone"
                  placeholder="1234-5678" valueLink={this.linkState('phone')} />
            </div>
          </div>
          <button className="btn btn-default col-sm-offset-2" onClick={this.handleSubmit.bind(this)}>Add</button>
        </form>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    let contact = {
      name: this.state.name,
      fav: false,
      email: this.state.email,
      address: this.state.address,
      phone: this.state.phone
    };
    ActionCreators.addContact(contact);
    this.transitionTo('contacts');
  }
}

Mixin.onClass(NewContactPage, Addons.addons.LinkedStateMixin);
Mixin.onClass(NewContactPage, Router.Navigation);


export default NewContactPage;

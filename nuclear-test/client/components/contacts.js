'use strict';

import React from 'react';
import Router from 'react-router';
import cn from 'classnames';


class ContactListItem extends React.Component {
  render() {
    let contact = this.props.contact;

    return (
      <li className="list-group-item" key={contact.get('id')}>
        <div>
          <div className="pull-left">
            <span className={cn("glyphicon icon", {"glyphicon-star": contact.get('fav'), "glyphicon-star-empty": !contact.get('fav'), "invisible": !this.props.onFav})}
                aria-hidden="true" onClick={this.handleFav.bind(this)}></span>
          </div>
          <div className="pull-left">
            <span className="fa fa-user icon" aria-hidden="true" title={contact.get('name')}></span>
          </div>
          <div className="pull-right">
            <span className={cn("glyphicon glyphicon-remove icon", {"invisible": !this.props.onDelete})} aria-hidden="true"
                onClick={this.handleDelete.bind(this)}></span>
          </div>
          <div>
            <Router.Link to="contact" params={{contactId: contact.get('id')}}>
              <h4>{contact.get('name')}</h4>
            </Router.Link>
          </div>
        </div>
      </li>
    );
  }

  handleDelete() {
    this.props.onDelete(this.props.contact);
  }

  handleFav() {
    let contact = this.props.contact;
    this.props.onFav(contact, !contact.get('fav'));
  }
}


export default ContactListItem;

'use strict';

import React from 'react';
import {toImmutable} from 'nuclear-js';
import cn from 'classnames';


class Contact extends React.Component {
  render() {
    const defaultContact = {
      fav: false,
      name: '',
      email: '',
      address: '',
      phone: ''
    }
    let contact = this.props.contact || toImmutable(defaultContact);

    const dataFields = ['email', 'address', 'phone'];

    let rows = [];
    for(let field of dataFields) {
      rows.push(<tr key={field}><td><strong>{field}</strong></td><td>{contact.get(field)}</td></tr>);
    }

    return (
      <div>
        <div className="media">
          <div className="media-left">
            <span className={cn("glyphicon", {"glyphicon-star": contact.get('fav'), "glyphicon-star-empty": !contact.get('fav')})}
                aria-hidden="true"></span>
          </div>
          <div className="media-left">
            <span className="fa fa-user" aria-hidden="true" title={contact.get('name')}></span>
          </div>
          <div className="media-body">
            <h4 className="media-heading">{contact.get('name')}</h4>
          </div>
        </div>
        <div className="panel panel-default">
          <table className="table">
              {rows}
          </table>
        </div>
      </div>
    );
  }
}


export default Contact;

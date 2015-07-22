'use strict';

import React from 'react';


class List extends React.Component {
  render() {
    return (
      <ul className="list-group">
        {this.props.items}
      </ul>
    );
  }
}


export default List;

import React, { Component } from 'react';

// components
import ItemList from './ItemList';
import Filters from './Filters';

class NpcsLink extends Component {
  render() {
    return (
      <div id="main">
        <Filters />
        <ItemList />
      </div>
    );
  }
}

export default NpcsLink;
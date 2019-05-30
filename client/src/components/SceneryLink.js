import React, { Component } from 'react';

// components
import ItemList from './ItemList';
import Filters from './Filters';

class SceneryLink extends Component {
  render() {
    return (
        <div id="main">
          <br />
          <Filters />
          <ItemList />
        </div>
    );
  }
}

export default SceneryLink;
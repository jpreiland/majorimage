import React, { Component } from 'react';

// components
import ObjectList from './objects/ObjectList';
import Filters from './Filters';

class SceneryLink extends Component {
  render() {
    return (
      <div id="main">
        <Filters />
        <ObjectList />
      </div>
    );
  }
}

export default SceneryLink;
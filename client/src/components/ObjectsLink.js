import React, { Component } from 'react';

// components
import ObjectList from './objects/ObjectList';
import ObjectFilters from './objects/filters/ObjectFilters';

class ObjectsLink extends Component {
  render() {
    return (
      <div id="main">
        <ObjectFilters />
        <ObjectList />
      </div>
    );
  }
}

export default ObjectsLink;
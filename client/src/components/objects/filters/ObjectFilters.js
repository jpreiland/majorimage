import React, { Component } from 'react';

// components
import ObjectFilterButtons from './ObjectFilterButtons';
import ObjectFilterBar from './ObjectFilterBar';

class ObjectFilters extends Component {
  render() {
    return (
      <React.Fragment>
        <ObjectFilterButtons />
        <ObjectFilterBar />      
      </React.Fragment>
    );
  }
}

export default (ObjectFilters);

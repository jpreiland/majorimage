import React, { Component } from 'react';

// components
import ObjectFilterButtons from './ObjectFilterButtons';
import ObjectFilterBar from './ObjectFilterBar';

class ObjectFilters extends Component {
  handleToggle(name) {
    this.props.handleToggleFilter(name);
  }

  render() {
    return (
      <React.Fragment>
        <ObjectFilterButtons activeFilters={this.props.activeFilters} handleToggle={this.handleToggle.bind(this)}/>
        <ObjectFilterBar />      
      </React.Fragment>
    );
  }
}

export default (ObjectFilters);

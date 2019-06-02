import React, { Component } from 'react';

// components
import ObjectList from './objects/ObjectList';
import ObjectFilters from './objects/filters/ObjectFilters';

class ObjectsLink extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Age: {active: false},
      Color: {active: true},
      Condition: {active: true},
      Material: {active: false},
      Size: {active: false}
    };
  }

  handleToggleFilter(name) {
    this.setState({[name]: {active: !this.state[name].active}});
  }

  render() {
    return (
      <div id="main">
        <ObjectFilters activeFilters={this.state} handleToggleFilter={this.handleToggleFilter.bind(this)} />
        <ObjectList activeFilters={this.state} />
      </div>
    );
  }
}

export default ObjectsLink;
import React, { Component } from 'react';

// components
import ObjectList from './objects/ObjectList';
import ObjectFilters from './objects/filters/ObjectFilters';

class ObjectsLink extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Color: {active: true},
      Quality: {active: true},
      Material: {active: false},
      Size: {active: false},
      isArmor: true,
      isClothing: true,
      isContainer: true,
      isFurniture: true,
      isMisc: true,
      isTreasure: true,
      isWeapon: true,
      isWriting: true
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
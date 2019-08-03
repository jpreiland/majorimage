import React, { Component } from 'react';

// components
import ObjectFilterButton from './ObjectFilterButton';

class ObjectFilterButtons extends Component {

  constructor(props) {
    super(props);
    this.state = this.props.activeFilters;
  }

  toggle(name) {
    this.setState({[name]: {active: !this.state[name].active}});
    this.props.handleToggle(name);
  }

  render() {
    return (
      <div className="filter-bar">
        <ObjectFilterButton name="Age" active={this.state.Age.active} toggle={this.toggle.bind(this, "Age")} />
        <ObjectFilterButton name="Color" active={this.state.Color.active} toggle={this.toggle.bind(this, "Color")} />
        <ObjectFilterButton name="Quality" active={this.state.Quality.active} toggle={this.toggle.bind(this, "Quality")} />
        <ObjectFilterButton name="Material" active={this.state.Material.active} toggle={this.toggle.bind(this, "Material")} />
        <ObjectFilterButton name="Size" active={this.state.Size.active} toggle={this.toggle.bind(this, "Size")} />
      </div>
    );
  }
}

export default (ObjectFilterButtons);

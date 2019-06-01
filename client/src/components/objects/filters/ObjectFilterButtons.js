import React, { Component } from 'react';

// components
import ObjectFilterButton from './ObjectFilterButton';

class ObjectFilterButtons extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Age: {active: true},
      Color: {active: true},
      Condition: {active: true},
      Material: {active: true},
      Type: {active: true},
      Size: {active: false}
    };
  }

  toggle(name) {
    this.setState({[name]: {active: !this.state[name].active}});
  }

  render() {
    return (
      <div className="filter-bar">
        <ObjectFilterButton name="Age" active={this.state.Age.active} toggle={this.toggle.bind(this, "Age")} />
        <ObjectFilterButton name="Color" active={this.state.Color.active} toggle={this.toggle.bind(this, "Color")} />
        <ObjectFilterButton name="Condition" active={this.state.Condition.active} toggle={this.toggle.bind(this, "Condition")} />
        <ObjectFilterButton name="Material" active={this.state.Material.active} toggle={this.toggle.bind(this, "Material")} />
        <ObjectFilterButton name="Type" active={this.state.Type.active} toggle={this.toggle.bind(this, "Type")} />
        <ObjectFilterButton name="Size" active={this.state.Size.active} toggle={this.toggle.bind(this, "Size")} />
      </div>
    );
  }
}

export default (ObjectFilterButtons);

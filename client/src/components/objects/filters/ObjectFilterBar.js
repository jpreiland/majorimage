import React, { Component } from 'react';

// components
import ObjectFilterBarOpt from './ObjectFilterBarOpt';

class ObjectFilterBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      OFF: {name: "OFF", active: false},
      ANY: {name: "ANY", active: true},
      FURNITURE: {name: "FURNITURE", active: false},
      CLOTHING: {name: "CLOTHING", active: false},
      ARMS_ARMOR: {name: "ARMS/ARMOR", active: false},
      CONTAINERS: {name: "CONTAINERS", active: false},
      WRITING: {name: "WRITING", active: false},
      TREASURE: {name: "TREASURE", active: false},
      MISC: {name: "MISC", active: false}
    };
  }

  toggle(name) {
    // turn off current active, then turn on option
    for (var key in this.state) {
      if (this.state[key].name === name) {
        this.setState({[key]: {name: this.state[key].name, active: true}});
      } else {
        this.setState({[key]: {name: this.state[key].name, active: false}});
      }
    }
  }

  render() {
    return (
      <div className="filter-opt-bar">
        <ObjectFilterBarOpt name={this.state.OFF.name} active={this.state.OFF.active} 
                            toggle={this.toggle.bind(this, this.state.OFF.name)}/>
        <ObjectFilterBarOpt name={this.state.ANY.name} active={this.state.ANY.active}  
                            toggle={this.toggle.bind(this, this.state.ANY.name)}/>
        <ObjectFilterBarOpt name={this.state.FURNITURE.name} active={this.state.FURNITURE.active}  
                            toggle={this.toggle.bind(this, this.state.FURNITURE.name)}/>
        <ObjectFilterBarOpt name={this.state.CLOTHING.name} active={this.state.CLOTHING.active}  
                            toggle={this.toggle.bind(this, this.state.CLOTHING.name)}/>
        <ObjectFilterBarOpt name={this.state.ARMS_ARMOR.name} active={this.state.ARMS_ARMOR.active}  
                            toggle={this.toggle.bind(this, this.state.ARMS_ARMOR.name)}/>
        <ObjectFilterBarOpt name={this.state.CONTAINERS.name} active={this.state.CONTAINERS.active}  
                            toggle={this.toggle.bind(this, this.state.CONTAINERS.name)}/>
        <ObjectFilterBarOpt name={this.state.WRITING.name} active={this.state.WRITING.active}  
                            toggle={this.toggle.bind(this, this.state.WRITING.name)}/>
        <ObjectFilterBarOpt name={this.state.TREASURE.name} active={this.state.TREASURE.active}  
                            toggle={this.toggle.bind(this, this.state.TREASURE.name)}/>
        <ObjectFilterBarOpt name={this.state.MISC.name} active={this.state.MISC.active}  
                            toggle={this.toggle.bind(this, this.state.MISC.name)}/>
      </div>
    );
  }
}

export default (ObjectFilterBar);

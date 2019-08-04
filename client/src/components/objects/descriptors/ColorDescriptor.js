import React, { Component } from 'react';
import { _COLOR } from '../ObjectConstants';

class ColorDescriptor extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      classNamesActive: "descriptor color-desc",
      classNamesInactive: "descriptor color-desc descriptor-hidden"
    };
  }

  handleReroll = () => {
    this.props.onReroll(_COLOR); 
  }

  render() {
    return (
      <span className={this.props.active ? this.state.classNamesActive : this.state.classNamesInactive } 
            onClick={this.handleReroll}>
        {this.props.itemName} 
      </span>
    );
  }
}

export default ColorDescriptor;
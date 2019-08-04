import React, { Component } from 'react';
import { _MATERIAL } from '../ObjectConstants';

class MaterialDescriptor extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      classNamesActive: "descriptor material-desc",
      classNamesInactive: "descriptor material-desc descriptor-hidden"
    };
  }

  handleReroll = () => {
    this.props.onReroll(_MATERIAL); 
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

export default MaterialDescriptor;
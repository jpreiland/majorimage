import React, { Component } from 'react';
import { _QUALITY } from '../ObjectConstants';

class QualityDescriptor extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      classNamesActive: "descriptor quality-desc",
      classNamesInactive: "descriptor quality-desc descriptor-hidden"
    };
  }

  handleReroll = () => {
    this.props.onReroll(_QUALITY); 
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

export default QualityDescriptor;
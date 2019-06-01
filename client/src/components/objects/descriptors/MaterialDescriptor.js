import React, { Component } from 'react';

class MaterialDescriptor extends Component {
  handleReroll = () => {
    this.props.onReroll(3); 
  }

  render() {
    return (
      <span key="3" className="descriptor material-desc" onClick={this.handleReroll}>
        {this.props.itemName}
      </span>
    );
  }
}

export default MaterialDescriptor;
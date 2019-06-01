import React, { Component } from 'react';

class ColorDescriptor extends Component {
  handleReroll = () => {
    this.props.onReroll(2); 
  }

  render() {
    return (
      <span key="2" className="descriptor color-desc" onClick={this.handleReroll}>
        {this.props.itemName}
      </span>
    );
  }
}

export default ColorDescriptor;
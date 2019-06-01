import React, { Component } from 'react';

class AgeDescriptor extends Component {
  handleReroll = () => {
    this.props.onReroll(0); 
  }

  render() {
    return (
      <span key="0" className="descriptor age-desc" onClick={this.handleReroll}>
        {this.props.itemName}
      </span>
    );
  }
}

export default AgeDescriptor;
import React, { Component } from 'react';

class ConditionDescriptor extends Component {
  handleReroll = () => {
        this.props.onReroll(1); 
  }

  render() {
    return (
      <span key="1" className="descriptor condition-desc" onClick={this.handleReroll}>
        {this.props.itemName}
      </span>
    );
  }
}

export default ConditionDescriptor;
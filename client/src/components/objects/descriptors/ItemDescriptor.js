import React, { Component } from 'react';

class ItemDescriptor extends Component {
  handleReroll = () => {
        this.props.onReroll(3);
  }

  render() {
    return (
      <span key="4" className="descriptor item-desc" onClick={this.handleReroll}>
        {this.props.itemName}
      </span>
    );
  }
}

export default ItemDescriptor;
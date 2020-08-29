import React, { Component } from 'react';
import { _TYPE } from '../ObjectConstants';

class ItemDescriptor extends Component {
  handleReroll = () => {
        this.props.onReroll(_TYPE);
  }

  render() {
    return (
      <span key="4" className="descriptor item-desc noselect" onClick={this.handleReroll}>
        {this.props.itemName}
      </span>
    );
  }
}

export default ItemDescriptor;
import React, { Component } from 'react';

class ColorDescriptor extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      classNamesActive: "descriptor color-desc",
      classNamesInactive: "descriptor color-desc descriptor-hidden"
    };
  }

  handleReroll = () => {
    this.props.onReroll(1); 
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
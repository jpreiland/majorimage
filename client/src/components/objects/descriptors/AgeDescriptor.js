import React, { Component } from 'react';

class AgeDescriptor extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      classNamesActive: "descriptor age-desc",
      classNamesInactive: "descriptor age-desc descriptor-hidden"
    };
  }

  handleReroll = () => {
    this.props.onReroll(0); 
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

export default AgeDescriptor;
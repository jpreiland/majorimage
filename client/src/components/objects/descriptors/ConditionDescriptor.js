import React, { Component } from 'react';

class ConditionDescriptor extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      classNamesActive: "descriptor condition-desc",
      classNamesInactive: "descriptor condition-desc descriptor-hidden"
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

export default ConditionDescriptor;
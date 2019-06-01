import React, { Component } from 'react';

class ObjectFilterBarOpt extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      classNamesActive: "filter-opt filter-opt-selected",
      classNamesInactive: "filter-opt"
    };
  }

  render() {
    return (
        <div className={this.props.active ? this.state.classNamesActive : this.state.classNamesInactive} 
             onClick={this.props.toggle}>
          { this.props.name } 
        </div>
    );
  }
}

export default (ObjectFilterBarOpt);

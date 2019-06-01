import React, { Component } from 'react';

class ObjectFilterButton extends Component {  
  
  constructor(props) {
    super(props);
    this.state = {
      classNamesActive: "btn-filter " + this.props.name.toLowerCase(),      
      classNamesInactive: "btn-filter " + this.props.name.toLowerCase() + " btn-filter-inactive"
    };
  }
  render() {
    return (
        <div className="filter">
          <button className={this.props.active ? this.state.classNamesActive : this.state.classNamesInactive}
                  onClick={this.props.toggle}>
          { this.props.name }
          </button>
        </div>
    );
  }
}

export default (ObjectFilterButton);

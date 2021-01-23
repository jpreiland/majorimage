import React, { Component } from 'react';

class RollButton extends Component {
  handleReroll = () => {
        console.log("a");
        this.props.onFirstRoll();
  }
  render() {
    return (
      <span key="999" className="btn-first-roll" onClick={this.handleReroll}>
        Generate Objects!
      </span>
    );
  }
}

export default RollButton;
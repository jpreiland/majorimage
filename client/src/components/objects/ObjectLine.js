import React, { Component } from 'react';

// components
import ItemDescriptor from './descriptors/ItemDescriptor';
import AgeDescriptor from './descriptors/AgeDescriptor';
import ConditionDescriptor from './descriptors/ConditionDescriptor';
import ColorDescriptor from './descriptors/ColorDescriptor';
import MaterialDescriptor from './descriptors/MaterialDescriptor';

const _AGE = 0;
const _CONDITION = 1;
const _COLOR = 2;
const _MATERIAL = 3;
const _TYPE = 4;

class ObjectLine extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  displayItem(index) {
    var data = this.props.data;
    if(data.loading) {
      // default name for an item's type is "object"
      return( "object" );
    } else {
      var total_items = data.items.length;
      var random_index = Math.floor(Math.random() * total_items);

      // genuinely no idea why these two lines are required
      // to fix bug where rerolling a descriptor rerolls
      // that descriptor for every line.
      var tempitems = this.state.items;
      tempitems[index] = data.items[random_index].name;

      return data.items[random_index].name;
    }
  }

  reroll() {
    console.log("child reroll");
  }

  displayLine(index) {
    var data = this.props.data;
    if(data.loading) {
      // default name for an item's type is "object"
      return( "object" );
    } else {
      return(
        "test loaded"
      );
    }      
  }

  handleReroll = (value) => {
    this.props.onReroll(value); 
  }

  render() {
    return (
      <div>
        <button className="btn-reroll" onClick={this.props.onRerollAll}>Reroll</button>
        {'\u00A0'}A(n){'\u00A0'}
        <AgeDescriptor itemName={this.props.lineDescriptors[_AGE]} onReroll={this.handleReroll} />
        <ConditionDescriptor itemName={this.props.lineDescriptors[_CONDITION]} onReroll={this.handleReroll} />
        <ColorDescriptor itemName={this.props.lineDescriptors[_COLOR]} onReroll={this.handleReroll} />
        <MaterialDescriptor itemName={this.props.lineDescriptors[_MATERIAL]} onReroll={this.handleReroll} />
        <ItemDescriptor itemName={this.props.lineDescriptors[_TYPE]} onReroll={this.handleReroll} />
      </div>
    );
  }
}

export default ObjectLine;

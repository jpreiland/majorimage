import React, { Component } from 'react';

// components
import ItemDescriptor from './descriptors/ItemDescriptor';
import QualityDescriptor from './descriptors/QualityDescriptor';
import ColorDescriptor from './descriptors/ColorDescriptor';
import MaterialDescriptor from './descriptors/MaterialDescriptor';

const _QUALITY = 0;
const _COLOR = 1;
const _MATERIAL = 2;
const _TYPE = 3;

class ObjectLine extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleReroll = (value) => {
    console.log(value);
    this.props.onReroll(value); 
  }

  render() {
    return (
      <div>
        <button className="btn-reroll" onClick={this.props.onRerollLine}>Reroll</button>
        {'\u00A0'}A(n){'\u00A0'}
        <QualityDescriptor itemName={this.props.lineDescriptors[_QUALITY]} 
                             active={this.props.activeFilters.Quality.active} 
                             onReroll={this.handleReroll} />
        <ColorDescriptor itemName={this.props.lineDescriptors[_COLOR]} 
                         active={this.props.activeFilters.Color.active} 
                         onReroll={this.handleReroll} />
        <MaterialDescriptor itemName={this.props.lineDescriptors[_MATERIAL]} 
                            active={this.props.activeFilters.Material.active} 
                            onReroll={this.handleReroll} />
        <ItemDescriptor itemName={this.props.lineDescriptors[_TYPE]} 
                        active={true} // Item is always active
                        onReroll={this.handleReroll} />
      </div>
    );
  }
}

export default ObjectLine;

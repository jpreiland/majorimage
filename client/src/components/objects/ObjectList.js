import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getItemsQuery } from '../../queries/queries';

// components
import ObjectLine from './ObjectLine';

const LINE_ONE = 0;
const LINE_TWO = 1;
const LINE_THREE = 2;
const LINE_FOUR = 3;
const LINE_FIVE = 4;
const _AGE = 0;
const _CONDITION = 1;
const _COLOR = 2;
const _MATERIAL = 3;
const _TYPE = 4;

class ObjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptors: [
        ["ageOne","conOne","colorOne","matOne","itemOne"],
        ["ageTwo","conTwo","colorTwo","matTwo","itemTwo"],
        ["ageThree","conThree","colorThree","matThree","itemThree"],
        ["ageFour","conFour","colorFour","matFour","itemFour"],
        ["ageFive","conFive","colorFive","matFive","itemFive"]
      ]
    };
  }

  getRandomDescriptor(descriptor) {
    var data = this.props.data;
    data.ages = ["new", "old", "ancient"];
    data.conditions = ["dusty", "broken", "pristine", "unfinished", "decrepit"];
    data.colors = ["grey", "green", "black", "white", "red", "blue", "gold", "silver", "brown"];
    data.materials = ["iron", "wooden", "glass", "ivory", "obsidian"];
    if(data.loading) {
      // default name for an item's type is "object"
      return( "object" );
    } else {
      var random_index;
      switch(descriptor) {
        case _AGE:
          var total_ages = data.ages.length;
          random_index = Math.floor(Math.random() * total_ages);
          return data.ages[random_index];
        case _CONDITION:
          var total_conditions = data.conditions.length;
          random_index = Math.floor(Math.random() * total_conditions);
          return data.conditions[random_index];
        case _COLOR:
          var total_colors = data.colors.length;
          random_index = Math.floor(Math.random() * total_colors);
          return data.colors[random_index];
        case _MATERIAL:
          var total_materials = data.materials.length;
          random_index = Math.floor(Math.random() * total_materials);
          return data.materials[random_index];
        case _TYPE:
          var total_items = data.items.length;
          random_index = Math.floor(Math.random() * total_items);
          return data.items[random_index].name;
        default:
          return "invalid descriptor";
      }
    }
  }

  handleReroll = (line, descriptor) => {
    this.reroll(line, descriptor);
  }

  // TODO: use descriptor parameter to pull from correct data
  reroll(line, descriptor) {
    console.log("Line " + line + " Descriptor " + descriptor)
    var descriptors = this.state.descriptors;
    descriptors[line][descriptor] = this.getRandomDescriptor(descriptor);
    this.setState({descriptors: descriptors});
  }

  // TODO
  rerollAll(line) {
    var descriptors = this.state.descriptors;
    for (const descriptor of Array(5).keys()) {
      descriptors[line][descriptor] = this.getRandomDescriptor(descriptor);
    }
    this.setState({descriptors: descriptors});
  }

  render() {
    return (
      <React.Fragment>
      <ObjectLine lineDescriptors={this.state.descriptors[LINE_ONE]} 
                onReroll={this.handleReroll.bind(this, LINE_ONE)} 
                onRerollAll={this.rerollAll.bind(this, LINE_ONE)} />

      <ObjectLine lineDescriptors={this.state.descriptors[LINE_TWO]} 
                onReroll={this.handleReroll.bind(this, LINE_TWO)} 
                onRerollAll={this.rerollAll.bind(this, LINE_TWO)} />

      <ObjectLine lineDescriptors={this.state.descriptors[LINE_THREE]} 
                onReroll={this.handleReroll.bind(this, LINE_THREE)} 
                onRerollAll={this.rerollAll.bind(this, LINE_THREE)} />

      <ObjectLine lineDescriptors={this.state.descriptors[LINE_FOUR]} 
                onReroll={this.handleReroll.bind(this, LINE_FOUR)} 
                onRerollAll={this.rerollAll.bind(this, LINE_FOUR)} />

      <ObjectLine lineDescriptors={this.state.descriptors[LINE_FIVE]} 
                onReroll={this.handleReroll.bind(this, LINE_FIVE)} 
                onRerollAll={this.rerollAll.bind(this, LINE_FIVE)} />
      </React.Fragment>
    );
  }
}

export default graphql(getItemsQuery)(ObjectList);
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getItemsQuery } from '../../queries/queries';
import * as Constants from './ObjectConstants';

// components
import ObjectLine from './ObjectLine';

const blankspaces = '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0';

class ObjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptors: [
        [blankspaces, blankspaces, blankspaces, blankspaces, blankspaces],
        [blankspaces, blankspaces, blankspaces, blankspaces, blankspaces],
        [blankspaces, blankspaces, blankspaces, blankspaces, blankspaces],
        [blankspaces, blankspaces, blankspaces, blankspaces, blankspaces],
        [blankspaces, blankspaces, blankspaces, blankspaces, blankspaces]
      ]
    };
  }

  // TODO: this is not good, waiting 250ms before initializing state
  // because the query results aren't ready immediately. 
  // Find a correct solution.
  componentDidMount() {
    setTimeout(
      function() {
        this.rerollAll(Constants.LINE_ONE);
        this.rerollAll(Constants.LINE_TWO);
        this.rerollAll(Constants.LINE_THREE);
        this.rerollAll(Constants.LINE_FOUR);
        this.rerollAll(Constants.LINE_FIVE);
      }.bind(this),
      250
    );
  }

  getRandomDescriptor(descriptor) {
    var data = this.props.data;
    data.ages = ["new", "old", "ancient"];
    data.conditions = ["dusty", "broken", "pristine", "unfinished", "decrepit"];
    data.colors = ["grey", "green", "black", "white", "red", "blue", "gold", "silver", "brown"];
    data.materials = ["iron", "wooden", "glass", "ivory", "obsidian"];
    if(data.loading) {
      // default name for an item's type is "object"
      return( blankspaces );
    } else {
      var random_index;
      switch(descriptor) {
        case Constants._AGE:
          var total_ages = data.ages.length;
          random_index = Math.floor(Math.random() * total_ages);
          return data.ages[random_index];
        case Constants._CONDITION:
          var total_conditions = data.conditions.length;
          random_index = Math.floor(Math.random() * total_conditions);
          return data.conditions[random_index];
        case Constants._COLOR:
          var total_colors = data.colors.length;
          random_index = Math.floor(Math.random() * total_colors);
          return data.colors[random_index];
        case Constants._MATERIAL:
          var total_materials = data.materials.length;
          random_index = Math.floor(Math.random() * total_materials);
          return data.materials[random_index];
        case Constants._TYPE:
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

  reroll(line, descriptor) {
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
      <ObjectLine lineDescriptors={this.state.descriptors[Constants.LINE_ONE]} 
                  onReroll={this.handleReroll.bind(this, Constants.LINE_ONE)} 
                  onRerollAll={this.rerollAll.bind(this, Constants.LINE_ONE)} />

      <ObjectLine lineDescriptors={this.state.descriptors[Constants.LINE_TWO]} 
                  onReroll={this.handleReroll.bind(this, Constants.LINE_TWO)} 
                  onRerollAll={this.rerollAll.bind(this, Constants.LINE_TWO)} />

      <ObjectLine lineDescriptors={this.state.descriptors[Constants.LINE_THREE]} 
                  onReroll={this.handleReroll.bind(this, Constants.LINE_THREE)} 
                  onRerollAll={this.rerollAll.bind(this, Constants.LINE_THREE)} />

      <ObjectLine lineDescriptors={this.state.descriptors[Constants.LINE_FOUR]} 
                  onReroll={this.handleReroll.bind(this, Constants.LINE_FOUR)} 
                  onRerollAll={this.rerollAll.bind(this, Constants.LINE_FOUR)} />

      <ObjectLine lineDescriptors={this.state.descriptors[Constants.LINE_FIVE]} 
                  onReroll={this.handleReroll.bind(this, Constants.LINE_FIVE)} 
                  onRerollAll={this.rerollAll.bind(this, Constants.LINE_FIVE)} />
      </React.Fragment>
    );
  }
}

export default graphql(getItemsQuery)(ObjectList);
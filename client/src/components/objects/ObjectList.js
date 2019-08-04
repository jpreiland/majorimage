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
        [blankspaces, blankspaces, blankspaces, blankspaces],
        [blankspaces, blankspaces, blankspaces, blankspaces],
        [blankspaces, blankspaces, blankspaces, blankspaces],
        [blankspaces, blankspaces, blankspaces, blankspaces],
        [blankspaces, blankspaces, blankspaces, blankspaces]
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
      }.bind(this),
      250
    );
  }

  getRandomDescriptor(descriptor) {
    var data = this.props.data;

    data.qualities = ["dusty", "broken", "pristine", "unfinished", "decrepit", "immaculate", "exquisite", "shoddy",
                      "new", "old", "ancient", "artisinal"];

    data.colors = [ "grey", "green", "black", "white", "red", "blue", "gold", "silver", "blood red",
                    "brown", "yellow", "teal", "purple", "orange", "crimson", "olive", "amber",
                    "dark grey", "pink", "bronze", "dark green", "dark red", "dark blue", "indigo", "violet",
                    "light grey", "light green", "light red", "light blue", "light yellow", "tan"];

    data.materials = ["iron", "wooden", "glass", "ivory", "obsidian", "jade", "wicker", "icy", "steel", "clay",
                      "porcelain", "marble", "wax"];
    if(data.loading) {
      // default name for an item's type is "object"
      return( blankspaces );
    } else {
      var random_index;
      switch(descriptor) {
        case Constants._QUALITY:
          var total_qualities = data.qualities.length;
          random_index = Math.floor(Math.random() * total_qualities);
          return data.qualities[random_index];
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
    descriptors[line][descriptor] = this.getRandomDescriptor(descriptor); // TODO why does this need -1
    this.setState({descriptors: descriptors});
  }

  // TODO
  rerollAll(line) {
    var descriptors = this.state.descriptors;
    for (const descriptor of Array(4).keys()) {
      descriptors[line][descriptor] = this.getRandomDescriptor(descriptor);
    }
    this.setState({descriptors: descriptors});
  }

  render() {
    return (
      <React.Fragment>
      <ObjectLine lineDescriptors={this.state.descriptors[Constants.LINE_ONE]} 
                  onReroll={this.handleReroll.bind(this, Constants.LINE_ONE)} 
                  onRerollAll={this.rerollAll.bind(this, Constants.LINE_ONE)}
                  activeFilters={this.props.activeFilters} />

      <ObjectLine lineDescriptors={this.state.descriptors[Constants.LINE_TWO]} 
                  onReroll={this.handleReroll.bind(this, Constants.LINE_TWO)} 
                  onRerollAll={this.rerollAll.bind(this, Constants.LINE_TWO)}
                  activeFilters={this.props.activeFilters} />

      <ObjectLine lineDescriptors={this.state.descriptors[Constants.LINE_THREE]} 
                  onReroll={this.handleReroll.bind(this, Constants.LINE_THREE)} 
                  onRerollAll={this.rerollAll.bind(this, Constants.LINE_THREE)} 
                  activeFilters={this.props.activeFilters} />

      <ObjectLine lineDescriptors={this.state.descriptors[Constants.LINE_FOUR]} 
                  onReroll={this.handleReroll.bind(this, Constants.LINE_FOUR)} 
                  onRerollAll={this.rerollAll.bind(this, Constants.LINE_FOUR)} 
                  activeFilters={this.props.activeFilters} />
      </React.Fragment>
    );
  }
}

export default graphql(getItemsQuery)(ObjectList);
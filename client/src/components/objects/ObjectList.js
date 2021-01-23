import React, { Component } from 'react';
import { compose, graphql, withApollo, Query } from 'react-apollo';
import { getDataQuery } from '../../queries/queries';
import * as Constants from './ObjectConstants';

// components
import ObjectLine from './ObjectLine';
import RollButton from './RollButton'

const blankspaces = '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0';

class ObjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptors: [
        [blankspaces, "(loading)", blankspaces, blankspaces],
        [blankspaces, blankspaces, blankspaces, blankspaces],
        [blankspaces, blankspaces, blankspaces, blankspaces],
        [blankspaces, blankspaces, blankspaces, blankspaces],
        [blankspaces, blankspaces, blankspaces, blankspaces]
      ],
      notRolled: true
    };
  }

  getRandomDescriptor(descriptor) {
    var data = this.props.data;
    
    if(data.loading) {
      return( blankspaces );
    } else {
      var random_index;
      switch(descriptor) {
        case Constants._QUALITY:
          var total_qualities = data.qualities.length;
          random_index = Math.floor(Math.random() * total_qualities);
          return data.qualities[random_index].name;
        case Constants._COLOR:
          var total_colors = data.colors.length;
          random_index = Math.floor(Math.random() * total_colors);
          return data.colors[random_index].name;
        case Constants._MATERIAL:
          var total_materials = data.materials.length;
          random_index = Math.floor(Math.random() * total_materials);
          return data.materials[random_index].name;
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

  handleFirstRoll = (test_int) => {
    this.rerollLine(Constants.LINE_ONE);
    this.rerollLine(Constants.LINE_TWO);
    this.rerollLine(Constants.LINE_THREE);
    this.rerollLine(Constants.LINE_FOUR);
    this.setState({notRolled: false});
  }

  reroll(line, descriptor) {
    var descriptors = this.state.descriptors;
    descriptors[line][descriptor] = this.getRandomDescriptor(descriptor);
    this.setState({descriptors: descriptors});
  }

  rerollLine(line) {
    var descriptors = this.state.descriptors;
    for (const descriptor of Array(4).keys()) {
      descriptors[line][descriptor] = this.getRandomDescriptor(descriptor);
    }
    this.setState({descriptors: descriptors});
  }

  render() {
    const rollBtn = <center><RollButton onFirstRoll={this.handleFirstRoll.bind(this, 1)}/></center>
    const lines = 
      <React.Fragment>
        <ObjectLine lineDescriptors={this.state.descriptors[Constants.LINE_ONE]} 
                    onReroll={this.handleReroll.bind(this, Constants.LINE_ONE)} 
                    onRerollLine={this.rerollLine.bind(this, Constants.LINE_ONE)}
                    activeFilters={this.props.activeFilters} />

        <ObjectLine lineDescriptors={this.state.descriptors[Constants.LINE_TWO]} 
                    onReroll={this.handleReroll.bind(this, Constants.LINE_TWO)} 
                    onRerollLine={this.rerollLine.bind(this, Constants.LINE_TWO)}
                    activeFilters={this.props.activeFilters} />

        <ObjectLine lineDescriptors={this.state.descriptors[Constants.LINE_THREE]} 
                    onReroll={this.handleReroll.bind(this, Constants.LINE_THREE)} 
                    onRerollLine={this.rerollLine.bind(this, Constants.LINE_THREE)} 
                    activeFilters={this.props.activeFilters} />

        <ObjectLine lineDescriptors={this.state.descriptors[Constants.LINE_FOUR]} 
                    onReroll={this.handleReroll.bind(this, Constants.LINE_FOUR)} 
                    onRerollLine={this.rerollLine.bind(this, Constants.LINE_FOUR)} 
                    activeFilters={this.props.activeFilters} />
      </React.Fragment>

    return (
      <React.Fragment>
      { this.state.notRolled ? rollBtn : lines }
      </React.Fragment>
    );
  }
}

export default compose(
  withApollo,
  graphql(
    getDataQuery, 
    {
      options: (props) => ({
        variables: {
          isArmor: props.activeFilters.isArmor,
          isClothing: props.activeFilters.isClothing,
          isContainer: props.activeFilters.isContainer,
          isFurniture: props.activeFilters.isFurniture,
          isMisc: props.activeFilters.isMisc,
          isTreasure: props.activeFilters.isTreasure,
          isWeapon: props.activeFilters.isWeapon,
          isWriting: props.activeFilters.isWriting
        },
      })
    }
  )
)(ObjectList);
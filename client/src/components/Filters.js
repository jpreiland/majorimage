import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getItemsQuery } from '../queries/queries';


class Filters extends Component {
  displayItems() {
    var data = this.props.data;
    if(data.loading) {
      return( <div>Loading Items...</div> );
    } else {
      return data.items.map(item => {
        return( 
          <li key={ item.id } className="descriptor">{ item.name }</li>
          );
      });
    }
  }

  render() {
    return (
      <React.Fragment>
      <div>
        <select id="age-list" className="filter age">
          <option key="1" value="1">Age</option>
          <option key="2" value="2">Young</option>
          <option key="3" value="3">Old</option>
        </select>
        <select id="color-list" className="filter color">
          <option key="1" value="1">Color</option>
          <option key="2" value="2">Dark</option>
          <option key="3" value="3">Light</option>
        </select>
        <select id="condition-list" className="filter condition">
          <option key="1" value="1">Condition</option>
          <option key="2" value="2">Good</option>
          <option key="3" value="3">Poor</option>
        </select>
        <select id="material-list" className="filter material">
          <option key="1" value="1">Material</option>
          <option key="2" value="2">Metal</option>
          <option key="3" value="3">Stone</option>
          <option key="4" value="4">Glass</option>
          <option key="5" value="5">Organic</option>
        </select>
        <select id="type-list" className="filter type">
          <option key="1" value="1">Type</option>
          <option key="2" value="2">Furniture</option>
          <option key="3" value="3">Arms/Armor</option>
          <option key="4" value="4">Clothing</option>
          <option key="5" value="5">Food/Drink</option>
          <option key="6" value="6">Misc</option>
        </select>
        <select id="size-list" className="filter size">
          <option key="1" value="1">Size</option>
          <option key="2" value="2">Small</option>
          <option key="3" value="3">Medium</option>
          <option key="4" value="4">Large</option>
        </select>
      </div>
      </React.Fragment>
    );
  }
}

export default graphql(getItemsQuery)(Filters);

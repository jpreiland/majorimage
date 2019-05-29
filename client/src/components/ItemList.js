import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getItemsQuery } from '../queries/queries';


class ItemList extends Component {
  displayItems() {
    var data = this.props.data;
    if(data.loading) {
      return( <div>Loading Items...</div> );
    } else {
      return data.items.map(item => {
        return( 
          <li key={ item.id }>{ item.name }</li>
          );
      });
    }
  }

  render() {
    return (
      <div>
        <ul id="item-list">
        	{ this.displayItems() }
        </ul>
      </div>
    );
  }
}

export default graphql(getItemsQuery)(ItemList);

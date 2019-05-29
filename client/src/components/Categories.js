import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getItemsQuery } from '../queries/queries';


class Categories extends Component {
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
        [Menu]
        <br />
        <br />
      </div>
      </React.Fragment>
    );
  }
}

export default graphql(getItemsQuery)(Categories);

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
      <div className="filter-bar">
        <div className="filter">
          <button id="age-list" className="btn-filter age">
          Age
          </button>
        </div>

        <div className="filter">
          <button id="color-list" className="btn-filter color">
          Color
          </button>
        </div>

        <div className="filter">
          <button id="condition-list" className="btn-filter condition">
          Condition
          </button>
        </div>

        <div className="filter">
          <button id="material-list" className="btn-filter material">
          Material
          </button>
        </div>

        <div className="filter">
          <button id="type-list" className="btn-filter type">
            Type
          </button>
        </div>

        <div className="filter">
          <button id="size-list" className="btn-filter size">
          Size
          </button>
        </div>
      </div>
      <div className="filter-opt-bar">
        <div className="filter-opt">
          OFF
        </div>
        <div className="filter-opt filter-opt-selected">
          ANY
        </div>
        <div className="filter-opt">
          FURNITURE
        </div>
        <div className="filter-opt">
          CLOTHING
        </div>
        <div className="filter-opt">
          ARMS/ARMOR
        </div>
        <div className="filter-opt">
          CONTAINERS
        </div>
        <div className="filter-opt">
          WRITING
        </div>
        <div className="filter-opt">
          TREASURE
        </div>
        <div className="filter-opt">
          MISC
        </div>
      </div>
      </React.Fragment>
    );
  }
}

export default graphql(getItemsQuery)(Filters);

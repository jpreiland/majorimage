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
          <React.Fragment>
          <span key={ item.id } className="descriptor name">{ item.name }</span>
          </React.Fragment>
          );
      });
    }
  }

  render() {
    return (
      <React.Fragment>
      <div>
        A(n){'\u00A0'}
        <span key="0" className="descriptor age">old</span>
        <span key="1" className="descriptor condition">dusty</span>
        <span key="2" className="descriptor color">grey</span>
        <span key="3" className="descriptor material">stone</span>
        <span key="4" className="descriptor type">table</span>
        {'\u00A0'}{'\u00A0'}{'\u00A0'}
        <button className="btn-reroll">{'\u2b6e'}</button>
      </div>
      <div>
        A(n){'\u00A0'}
        <span key="0" className="descriptor age">old</span>
        <span key="1" className="descriptor condition">dusty</span>
        <span key="2" className="descriptor color">grey</span>
        <span key="3" className="descriptor material">stone</span>
        <span key="4" className="descriptor type">table</span>
        {'\u00A0'}{'\u00A0'}{'\u00A0'}
        <button className="btn-reroll">{'\u2b6e'}</button>
      </div>
      <div>
        A(n){'\u00A0'}
        <span key="0" className="descriptor age">old</span>
        <span key="1" className="descriptor condition">dusty</span>
        <span key="2" className="descriptor color">grey</span>
        <span key="3" className="descriptor material">stone</span>
        <span key="4" className="descriptor type">table</span>
        {'\u00A0'}{'\u00A0'}{'\u00A0'}
        <button className="btn-reroll">{'\u2b6e'}</button>
      </div>
      </React.Fragment>
    );
  }
}

export default graphql(getItemsQuery)(ItemList);

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
        <button className="btn-reroll">{'\u2b6e'}</button>
        {'\u00A0'}
        A(n)
        {'\u00A0'}
        <span key="0" className="descriptor-alt age-alt">old</span>
        <span key="1" className="descriptor-alt condition-alt">dusty</span>
        <span key="2" className="descriptor-alt color-alt">grey</span>
        <span key="3" className="descriptor-alt material-alt">stone</span>
        <span key="4" className="descriptor-alt type-alt">table</span>
      </div>
      <div>
        <button className="btn-reroll">{'\u2b6e'}</button>
        {'\u00A0'}
        A(n)
        {'\u00A0'}
        <span key="0" className="descriptor-alt age-alt">old</span>
        <span key="1" className="descriptor-alt condition-alt">dusty</span>
        <span key="2" className="descriptor-alt color-alt">grey</span>
        <span key="3" className="descriptor-alt material-alt">stone</span>
        <span key="4" className="descriptor-alt type-alt">table</span>
      </div>
      <div>
        <button className="btn-reroll">{'\u2b6e'}</button>
        {'\u00A0'}
        A(n)
        {'\u00A0'}
        <span key="0" className="descriptor-alt age-alt">old</span>
        <span key="1" className="descriptor-alt condition-alt">dusty</span>
        <span key="2" className="descriptor-alt color-alt">grey</span>
        <span key="3" className="descriptor-alt material-alt">stone</span>
        <span key="4" className="descriptor-alt type-alt">table</span>
      </div>
      <div>
        <button className="btn-reroll">{'\u2b6e'}</button>
        {'\u00A0'}
        A(n)
        {'\u00A0'}
        <span key="0" className="descriptor-alt age-alt">old</span>
        <span key="1" className="descriptor-alt condition-alt">dusty</span>
        <span key="2" className="descriptor-alt color-alt">grey</span>
        <span key="3" className="descriptor-alt material-alt">stone</span>
        <span key="4" className="descriptor-alt type-alt">table</span>
      </div>
      <div>
        <button className="btn-reroll">{'\u2b6e'}</button>
        {'\u00A0'}
        A(n)
        {'\u00A0'}
        <span key="0" className="descriptor-alt age-alt">old</span>
        <span key="1" className="descriptor-alt condition-alt">dusty</span>
        <span key="2" className="descriptor-alt color-alt">grey</span>
        <span key="3" className="descriptor-alt material-alt">stone</span>
        <span key="4" className="descriptor-alt type-alt">table</span>
      </div>
      </React.Fragment>
    );
  }
}

export default graphql(getItemsQuery)(ItemList);

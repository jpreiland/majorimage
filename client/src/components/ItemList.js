import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getItemsQuery } from '../queries/queries';

const LIST_ITEM_ONE = 0;
const LIST_ITEM_TWO = 1;
const LIST_ITEM_THREE = 2;
const LIST_ITEM_FOUR = 3;
const LIST_ITEM_FIVE = 4;


class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [null,null,null,null,null]
    };
  }

  displayItem(index) {
    var data = this.props.data;
    if(data.loading) {
      // default name for an item's type is "object"
      return( "object" );
    } else {
      var total_items = data.items.length;
      var random_index = Math.floor(Math.random() * total_items);

      // genuinely no idea why these two lines are required
      // to fix bug where rerolling a descriptor rerolls
      // that descriptor for every line.
      var tempitems = this.state.items;
      tempitems[index] = data.items[random_index].name;

      return data.items[random_index].name;
    }
  }

  reroll(index) {
    var tempitems = this.state.items;
    tempitems[index] = this.displayItem();
    this.setState({items: tempitems});
  }

  rerollAll(index) {
    var tempitems = this.state.items;
    tempitems[index] = this.displayItem();
    this.setState({items: tempitems});
  }

  displayLine(index) {
    var data = this.props.data;
    if(data.loading) {
      // default name for an item's type is "object"
      return( "object" );
    } else {
      return(
        <React.Fragment>
          <span key="0" className="descriptor age-desc">ancient</span>
          <span key="1" className="descriptor condition-desc">dusty</span>
          <span key="2" className="descriptor color-desc">grey</span>
          <span key="3" className="descriptor material-desc">stone</span>
          <span key="4" className="descriptor item-desc" onClick={this.reroll.bind(this, index)}>
            { this.state.items[index] || this.displayItem(index) }
          </span>
        </React.Fragment>
      );
    }      
  }

  render() {
    return (
      <React.Fragment>
      <div>
        <button className="btn-reroll" onClick={this.rerollAll.bind(this, LIST_ITEM_ONE)}>Reroll</button>
        {'\u00A0'}A(n){'\u00A0'}{this.displayLine(LIST_ITEM_ONE)}
      </div>
      <div>
        <button className="btn-reroll" onClick={this.rerollAll.bind(this, LIST_ITEM_TWO)}>Reroll</button>
        {'\u00A0'}A(n){'\u00A0'}{this.displayLine(LIST_ITEM_TWO)}
      </div>
      <div>
        <button className="btn-reroll" onClick={this.rerollAll.bind(this, LIST_ITEM_THREE)}>Reroll</button>
        {'\u00A0'}A(n){'\u00A0'}{this.displayLine(LIST_ITEM_THREE)}
      </div>
      <div>
        <button className="btn-reroll" onClick={this.rerollAll.bind(this, LIST_ITEM_FOUR)}>Reroll</button>
        {'\u00A0'}A(n){'\u00A0'}{this.displayLine(LIST_ITEM_FOUR)}
      </div>
      <div>
        <button className="btn-reroll" onClick={this.rerollAll.bind(this, LIST_ITEM_FIVE)}>Reroll</button>
        {'\u00A0'}A(n){'\u00A0'}{this.displayLine(LIST_ITEM_FIVE)}
      </div>
      </React.Fragment>
    );
  }
}

export default graphql(getItemsQuery)(ItemList);

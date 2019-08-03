import React, { Component } from 'react';

// TODO: Remove this component once each page has its filter components set up
class Filters extends Component {

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
          <button id="quality-list" className="btn-filter quality">
          Quality
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

export default (Filters);

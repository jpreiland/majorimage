import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// components
import Header from './components/Header';
import ObjectsLink from './components/ObjectsLink';
import SceneryLink from './components/SceneryLink';
import NpcsLink from './components/NpcsLink';

class App extends Component {
  render() {
    return (
    <div className="frame">
      <div className="contents">
        <Header />
        <div className="listalign2">
          <Switch>
            <Route exact path="/" component={ObjectsLink} />
            <Route exact path="/scenery" component={SceneryLink} />
            <Route exact path="/npc" component={NpcsLink} />
          </Switch>
        </div>
      </div>
    </div>
    );
  }
}

export default App;

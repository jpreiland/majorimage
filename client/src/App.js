import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from "react-helmet";

// components
import Header from './components/Header';
import ObjectsLink from './components/ObjectsLink';
import SceneryLink from './components/SceneryLink';
import NpcsLink from './components/NpcsLink';

class App extends Component {
  render() {
    return (
    <React.Fragment>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Major Image</title>
      </Helmet>
      <div className="frame">
        <div className="contents">
          <Header />
          <div>
            <Switch>
              <Route exact path="/" component={ObjectsLink} />
              <Route exact path="/scenery" component={SceneryLink} />
              <Route exact path="/npc" component={NpcsLink} />
            </Switch>
          </div>
        </div>
      </div>
    </React.Fragment>
    );
  }
}

export default App;

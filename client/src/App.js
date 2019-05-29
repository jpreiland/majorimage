import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// components
import Categories from './components/Categories';
import ItemList from './components/ItemList';
import Filters from './components/Filters';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Major Image</h1>
          <Categories />
          <Filters />
          <ItemList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;

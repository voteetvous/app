import 'font-awesome/css/font-awesome.css';

import React, { Component } from 'react';
import { Style, StyleRoot } from 'radium';
import normalize from 'radium-normalize';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import configureStore from '../redux/configureStore';
import Results from './Results';

import Game from '../components/Game';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
});
const apolloClient = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id,
});
const store = configureStore(apolloClient);

export default class App extends Component {
  render() {
    return (
      <ApolloProvider store={store} client={apolloClient}>
        <StyleRoot style={styles.rootStyle}>
          <Style rules={{ ...normalize, ...styles.base }} />
          <Router>
            <div style={styles.navigationContainer}>
              <Route exact path="/" component={Game} />
              <Route path="/sessions/:sessionId/results" component={Results} />
            </div>
          </Router>
        </StyleRoot>
      </ApolloProvider>
    );
  }
}

const styles = {
  base: {
    html: {
      // backgroundColor: '#f0f0f0',
    },
    'html, body, #app': {
      display: 'flex',
      flex: 1,
      fontFamily: 'Roboto',
    },
    '*': {
      boxSizing: 'border-box',
      color: 'inherit',
    },
    style: {
      display: 'none',
    },
  },
  rootStyle: {
    display: 'flex',
    flex: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 400,
    display: 'flex',
  },
  navigationContainer: {
    display: 'flex',
    flex: 1,
  },
};

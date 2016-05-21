import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import createLogger from 'redux-logger';

import { createRootReducer, rootEpic } from './modules/root';


export default (apolloClient) => {
  const epicMiddleware = createEpicMiddleware(rootEpic);

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle, max-len

  const logger = createLogger();

  const store = createStore(
    createRootReducer(apolloClient),
    // composeEnhancers(applyMiddleware(apolloClient.middleware(), epicMiddleware, logger)),
    composeEnhancers(applyMiddleware(apolloClient.middleware(), epicMiddleware)),
  );

  if (module.hot) {
    module.hot.accept('./modules/root', () => {
      store.replaceReducer(require('./modules/root').rootReducer); // eslint-disable-line global-require
    });
  }

  apolloClient.networkInterface.use([{
    applyMiddleware(req, next) {
      const state = store.getState();
      const { session: token } = state;

      if (!req.options.headers) {
        req.options.headers = {};  // eslint-disable-line no-param-reassign
      }

      if (token) {
        req.options.headers.authorization = `Bearer ${token}`; // eslint-disable-line no-param-reassign, max-len
      }

      next();
    },
  }]);

  return store;
};

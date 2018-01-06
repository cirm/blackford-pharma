// @flow
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import reducers from './reducers';
import checkRenewableTokens from './remote/bRemoteAuth';
import { renewToken } from './remote/bRemoteActionThunks';
import type { UpdateTokenResponse } from './remote/bRemoteAuth';

export const history = createHistory();

const routerHistory = routerMiddleware(history);

const logger = createLogger();
const middlewares = [thunk, routerHistory];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

const initialState = {};

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(reducers, initialState);

const restoreSession: UpdateTokenResponse = checkRenewableTokens();
if (restoreSession.apiToken) {
  store.dispatch(renewToken(restoreSession.apiToken));
}
export const getStore = () => store;

import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import Chat from 'twilio-chat';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import reducers from './reducers';
import remoteChatMiddleware from './remote/bRemoteClientMiddleware';

export const history = createHistory();

const routerHistory = routerMiddleware(history);

const logger = createLogger();
const middlewares = [thunk];
middlewares.push(remoteChatMiddleware(Chat), routerHistory);
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

const initialState = {};

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(reducers, initialState);

export const getStore = () => store;

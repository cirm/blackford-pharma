import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import token from './bToken/bTokenReducer';
import chat from './bChat/bChatReducer';
import remote from './remote/bRemoteReducer';

const reducers = combineReducers({
  chat,
  form,
  token,
  router,
  remote,
});

export default reducers;

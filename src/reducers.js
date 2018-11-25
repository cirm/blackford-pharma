import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import token from './token/tokenReducer';
import chat from './chat/chatReducer';
import remote from './remote/remoteReducer';
import avatar from './avatar/avatarReducer';

const reducers = combineReducers({
  chat,
  form,
  token,
  router,
  remote,
  avatar,
});

export default reducers;

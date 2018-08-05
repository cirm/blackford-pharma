// @flow

import { LOGOUT, TCONNECTED, TCONSTATE, TUPDATETOKEN } from './remoteActionConstants';
import type { RemoteState } from '../types/State';
import type { Action } from '../types/Action';

const getInitialState = () => ({ connectionState: 'disconnected' });

const updateConnectionClient = (state, data) => ({
  ...state,
  client: data,
  connectionState: data.connectionState,
});

function twilioClientReducer(state: RemoteState = getInitialState(), action: Action): RemoteState {
  switch (action.type) {
    case TCONNECTED:
      return updateConnectionClient(state, action.data);
    case TUPDATETOKEN:
      return state;
    case TCONSTATE:
      return { ...state, connectionState: action.data };
    case LOGOUT:
      return getInitialState();
    default:
      return state;
  }
}

export default twilioClientReducer;


import { LOGOUT, TCONNECT, TCREATE_CHANNEL, TGET_CHANNELS } from './bRemoteActionConstants';

const getInitialState = () => ({ client: undefined, connectionState: 'disconnected' });

const updateConnectionClient = (state, data) => ({
  ...state,
  client: data.client,
  connectionState: data.client.connectionState,
});

function remoteTwilioClientReducer(state = getInitialState(), action: Action) {
  switch (action.type) {
    case 'TWILIO/CLIENT_CONNECTED':
      return updateConnectionClient(state, action.data);
    case 'TWILIO/UPDATE_TOKEN':
      return state;
    case LOGOUT:
      return getInitialState();
    case TGET_CHANNELS:
      return state;
    default:
      return state;
  }
}

export default remoteTwilioClientReducer;

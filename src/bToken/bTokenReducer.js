// @flow
import {
  LOGOUT, UPDATE_TOKENS, TWILIO_INVALID,
} from './bTokenConstants';
import decodeProfile from './bAuthToken';
import type { TokenState } from '../types/State';
import type { Action } from '../types/Action';
import type { TokenApiResponse, DecodedTwilioToken, DecodedApiToken } from '../types/General';

const chatTokenKey: string = 'chatToken';
const apiTokenKey: string = 'apiToken';

const updateTokens = (state: TokenState, data: TokenApiResponse): TokenState => {
  localStorage.setItem(chatTokenKey, JSON.stringify(data.token));
  localStorage.setItem(apiTokenKey, JSON.stringify(data.apiToken));
  return {
    ...state,
    identity: data.identity,
    chatToken: data.token,
    apiToken: data.apiToken,
    id: data.id,
    roles: data.roles,
  };
};

const getInitialState = (state: TokenState = {}): TokenState => {
  const token: ?string = localStorage.getItem(chatTokenKey);
  const apiToken: ?string = localStorage.getItem(apiTokenKey);
  console.log(token);
  // console.log(apiToken);
  if (!token || !apiToken) {
    return {
      ...state,
    };
  }
  const decoded: DecodedTwilioToken = decodeProfile(JSON.parse(token));
  const decodedApiToken: DecodedApiToken = decodeProfile(JSON.parse(apiToken));
  return {
    ...state,
    identity: decoded.grants.identity,
    chatToken: token,
    apiToken,
    roles: decodedApiToken.roles,
    id: decodedApiToken.id,
  };
};

const removeFaultyToken = () => {
  localStorage.removeItem(chatTokenKey);
  return {};
};

const logOut = () => {
  localStorage.removeItem(chatTokenKey);
  localStorage.removeItem(apiTokenKey);
  return {};
};

function tokenReducer(state: TokenState = getInitialState(), action: Action): TokenState {
  switch (action.type) {
    case UPDATE_TOKENS:
      return updateTokens(state, action.data);
    case TWILIO_INVALID:
      return removeFaultyToken();
    case LOGOUT:
      return logOut();
    default:
      return state;
  }
}

export default tokenReducer;

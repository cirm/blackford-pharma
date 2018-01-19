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
  localStorage.setItem(chatTokenKey, JSON.stringify(data.chatToken));
  localStorage.setItem(apiTokenKey, JSON.stringify(data.apiToken));
  return {
    ...state,
    identity: data.identity,
    chatToken: data.chatToken,
    apiToken: data.apiToken,
    id: data.id,
    roles: data.roles,
  };
};

const getInitialState = (state: TokenState = {}): TokenState => {
  const tempChatToken = localStorage.getItem(chatTokenKey);
  const tempApiToken = localStorage.getItem(apiTokenKey);

  if (!tempChatToken || !tempApiToken || tempChatToken === 'undefined' || apiTokenKey === 'undefined') {
    return {
      ...state,
    };
  }

  const chatToken: string = JSON.parse(tempChatToken);
  const apiToken: string = JSON.parse(tempApiToken);

  if (!chatToken || !apiToken) {
    return {
      ...state,
    };
  }

  const decodedChatToken: DecodedTwilioToken = decodeProfile(chatToken);
  const decodedApiToken: DecodedApiToken = decodeProfile(apiToken);
  return {
    ...state,
    identity: decodedChatToken.grants.identity,
    chatToken,
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

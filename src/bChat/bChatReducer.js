// @flow
import {
  NEW_MESSAGE,
  UPDATE_CHANNELS,
  UPDATE_CHAT_CHANNEL,
  UPDATE_MESSAGES,
  UPDATE_USERS,
  TOGGLE_SIDEBAR,
} from './bChatActionConstants';
import type { Action } from '../types/Action';
import type { ChatState } from '../types/State';

const emptyChannel = { items: [] };

const initialState: ChatState = {
  sidebar: true,
  userList: [],
  channels: { private: emptyChannel, public: emptyChannel },
  currentChannel: undefined,
  messages: { items: [] },
};

const chatReducer = (state: ChatState = initialState, action: Action): ChatState => {
  switch (action.type) {
    case UPDATE_CHANNELS:
      return { ...state, channels: action.data };
    case UPDATE_USERS:
      return { ...state, userList: action.data };
    case UPDATE_CHAT_CHANNEL:
      return { ...state, currentChannel: action.data };
    case TOGGLE_SIDEBAR:
      return { ...state, sidebar: action.data };
    case UPDATE_MESSAGES:
      return { ...state, messages: action.data };
    case NEW_MESSAGE:
      return { ...state, messages: { items: [...state.messages.items, action.data] } };
    default:
      return state;
  }
};

export default chatReducer;
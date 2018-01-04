// @flow
import {
  NEW_MESSAGE,
  UPDATE_CHANNELS,
  UPDATE_CHAT_CHANNEL,
  UPDATE_MESSAGES,
  UPDATE_USERS,
  TOGGLE_SIDEBAR,
} from './bChatActionConstants';
import { LOGOUT } from '../bToken/bTokenConstants';
import type { Action } from '../types/Action';
import type{ ChatState } from '../types/State';

const initialState: ChatState = {
  sidebar: true,
  userList: [],
  messages: [],
  currentChannel: undefined,
  channelMessages: {},
  channelMembers: {},
  connectionState: 'disconnected',
};

const newChannel = (state, data) => state;
const updateChannelMessages = (state, data) => ({ ...state, channelMessages: { ...{ [data.channel]: data.messages }, ...state.channelMessages } });
const addNewMessage = (state, data) => {
  if (data.sid in state.channelMessages) {
    return { ...state, channelMessages: { ...state.channelMessages, [data.sid]: [...state.channelMessages[data.sid], ...data.message] } };
  }
  return { ...state, channelMessages: { ...state.channelMessages, [data.sid]: [...data.message] } };
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
    case 'UPDATE_CHANNEL_MESSAGES':
      return updateChannelMessages(state, action.data);
    case UPDATE_MESSAGES:
      return { ...state, messages: action.data };
    case LOGOUT:
      return { ...initialState };
    case 'TWILIO/CHANNEL_ADDED':
      return newChannel(state, action.data);
    case 'TWILIO/CONNECTION_STATE':
      return { ...state, connectionState: action.data };
    case NEW_MESSAGE:
      return addNewMessage(state, action.data);
    default:
      return state;
  }
};

export default chatReducer;

// @flow
import {
  NEW_MESSAGE,
  UPDATE_CHANNELS,
  UPDATE_CHAT_CHANNEL,
  UPDATE_USERS,
  TOGGLE_SIDEBAR,
  UPDATE_CHANNEL_MESSAGES,
} from './chatActionConstants';
import { TCHANADDED } from '../remote/remoteActionConstants';
import { LOGOUT } from '../token/tokenConstants';
import type { Action } from '../types/Action';
import type { ChatMessage } from '../types/General';
import type{ ChatState } from '../types/State';

const initialState: ChatState = {
  sidebar: true,
  userList: [],
  channelMap: {},
  currentChannel: undefined,
  channelMessages: {},
  channelMembers: {},
};

const newChannel = (state, data) => ({
  ...state,
  channelMap: {...state.channelMap, [data.sid]: data},
});
const updateChannelMessages = (state: ChatState, data: {channelSid: string, messages: Array<ChatMessage>}): ChatState => ({
  ...state,
  channelMessages: { ...{ [data.channelSid]: data.messages }, ...state.channelMessages },
});
const addNewMessage = (state: ChatState, data: {sid: string, message: ChatMessage}): ChatState => {
  if (data.sid in state.channelMessages) {
    return { ...state, channelMessages: { ...state.channelMessages, [data.sid]: [...state.channelMessages[data.sid], data.message] } };
  }
  return { ...state, channelMessages: { ...state.channelMessages, [data.sid]: [data.message] } };
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
    case UPDATE_CHANNEL_MESSAGES:
      return updateChannelMessages(state, action.data);
    case LOGOUT:
      return { ...initialState };
    case TCHANADDED:
      return newChannel(state, action.data);
    case NEW_MESSAGE:
      return addNewMessage(state, action.data);
    default:
      return state;
  }
};

export default chatReducer;

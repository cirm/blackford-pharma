// @flow
import { CONNECT, TOGGLE_SIDEBAR, UPDATE_CHAT_CHANNEL, UPDATE_MESSAGES, UPDATE_USERS } from './bChatActionConstants';
import type { channelApiResponse, messageApiResponse } from '../types/Twilio';

export const toggleSidebar = (data: boolean) => ({
  type: TOGGLE_SIDEBAR,
  data,
});
export const updateChatChannel = (data: channelApiResponse) => ({
  type: UPDATE_CHAT_CHANNEL,
  data,
});
export const updateMessages = (data: messageApiResponse) => ({
  type: UPDATE_MESSAGES,
  data,
});
export const updateUsers = (data: string[]) => ({
  type: UPDATE_USERS,
  data,
});
export const connectTwilioClient = (data: string) => ({
  type: CONNECT,
  data,
  meta: {
    chat: true,
  },
});

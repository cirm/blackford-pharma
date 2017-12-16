// @flow
import { TOGGLE_SIDEBAR, UPDATE_CHAT_CHANNEL, UPDATE_MESSAGES, UPDATE_USERS } from './bChatActionConstants';
import type { ChannelItem, MessageApiResponse } from '../types/Twilio';

export const toggleSidebar = (data: boolean) => ({
  type: TOGGLE_SIDEBAR,
  data,
});
export const updateChatChannel = (data: ChannelItem) => ({
  type: UPDATE_CHAT_CHANNEL,
  data,
});
export const updateMessages = (data: MessageApiResponse) => ({
  type: UPDATE_MESSAGES,
  data,
});
export const updateUsers = (data: string[]) => ({
  type: UPDATE_USERS,
  data,
});

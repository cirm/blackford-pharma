// @flow
import { TOGGLE_SIDEBAR, UPDATE_CHAT_CHANNEL, UPDATE_MESSAGES, UPDATE_USERS } from './bChatActionConstants';
import type { ChannelItem, MessageItem, MembersItem } from '../types/Twilio';

export const toggleSidebar = (data: boolean) => ({
  type: TOGGLE_SIDEBAR,
  data,
});
export const updateChatChannel = (data: ChannelItem) => ({
  type: UPDATE_CHAT_CHANNEL,
  data,
});
export const updateMessages = (data: Array<MessageItem>) => ({
  type: UPDATE_MESSAGES,
  data,
});
export const updateUsers = (data: Array<MembersItem>) => ({
  type: UPDATE_USERS,
  data,
});

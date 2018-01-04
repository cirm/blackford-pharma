// @flow
import { TOGGLE_SIDEBAR, UPDATE_CHAT_CHANNEL, UPDATE_USERS, UPDATE_CHANNEL_MESSAGES } from './bChatActionConstants';
import type { ChannelItem, MembersItem } from '../types/Twilio';
import type { ChatMessage } from '../types/General';


export const toggleSidebar = (data: boolean) => ({
  type: TOGGLE_SIDEBAR,
  data,
});

export const updateChatChannel = (data: ChannelItem) => ({
  type: UPDATE_CHAT_CHANNEL,
  data,
});

export const updateUsers = (data: Array<MembersItem>) => ({
  type: UPDATE_USERS,
  data,
});

export const updateChannelMessages = (data: {channelSid: string, messages: ChatMessage[]}) => ({
  type: UPDATE_CHANNEL_MESSAGES,
  data,
});


// @flow
import type { MessageItem, ChannelApiResponse } from '../types/Twilio';
import { NEW_MESSAGE, UPDATE_CHANNELS, TWILIO_INVALID } from './bRemoteActionConstants';

export const newMessage = (messageItem: MessageItem, sid: string) => ({
  type: NEW_MESSAGE,
  data: {
    sid,
    message: {
      author: messageItem.author,
      index: messageItem.index,
      timestamp: messageItem.timestamp,
      body: messageItem.body,
      sid: messageItem.sid,
    },
  },
});

export const updateChannels = (data: ChannelApiResponse) => ({
  type: UPDATE_CHANNELS,
  data,
});

export const twilioInvalid = () => ({
  type: TWILIO_INVALID,
});

export const newSystemMessage = (messageItem, sid: string) => ({
  type: NEW_MESSAGE,
  data: {
    sid,
    message: {
      author: messageItem.author,
      index: messageItem.index,
      timestamp: messageItem.timestamp,
      body: messageItem.body,
      sid: messageItem.sid,
    },
  },
});

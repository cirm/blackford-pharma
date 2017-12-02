// @flow
import type { messageItem, channelApiResponse } from '../types/Twilio';

export const newMessage = (message: messageItem) => ({
  type: 'NEW_MESSAGE',
  data: message,
});

export const updateChannels = (data: channelApiResponse) => ({
  type: 'UPDATE_CHANNELS',
  data,
});

// @flow
import type { MessageItem, ChannelApiResponse } from '../types/Twilio';
import { NEW_MESSAGE, UPDATE_CHANNELS, TWILIO_INVALID } from './bRemoteActionConstants';

export const newMessage = (message: MessageItem) => ({
  type: NEW_MESSAGE,
  data: message,
});

export const updateChannels = (data: ChannelApiResponse) => ({
  type: UPDATE_CHANNELS,
  data,
});

export const twilioInvalid = () => ({
  type: TWILIO_INVALID,
});

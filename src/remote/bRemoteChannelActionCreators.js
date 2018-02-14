// @flow
import type { MessageItem, ChannelApiResponse, Dispatch, GetState } from '../types';
import { updateTwilioChannelDescriptors } from './bRemoteActionThunks';
import { NEW_MESSAGE, UPDATE_CHANNELS, TWILIO_INVALID } from './bRemoteActionConstants';

export const newMessage = (messageItem: MessageItem, sid: string) => (dispatch: Dispatch, getState: GetState) =>  { 
  const state = getState();
  if (sid !== state.chat.currentChannel.sid) {
    dispatch(updateTwilioChannelDescriptors());
  }
  dispatch({
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
})
};

export const updateChannelDescriptors = (data: ChannelApiResponse) => ({
  type: UPDATE_CHANNELS,
  data,
});

export const twilioInvalid = () => ({
  type: TWILIO_INVALID,
});

export const newSystemMessage = (messageItem: MessageItem, sid: string) => ({
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

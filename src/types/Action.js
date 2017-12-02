// @flow
import type { Dispatch, GetState } from 'redux';
import { toggleSidebar, updateChatChannel, updateMessages, updateUsers, connectTwilioClient } from '../bChat/bChatActionCreators';
import { updateTokens } from '../bToken/bTokenActionCreators';
import { newMessage, updateChannels } from '../remote/bRemoteChannelActionCreators';

// https://hackernoon.com/redux-flow-type-getting-the-maximum-benefit-from-the-fewest-key-strokes-5c006c54ec87
type _ExtractReturn<B, F: (...args: any[]) => B> = B;
export type ExtractReturn<F> = _ExtractReturn<*, F>;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => Promise<void> | void => void;


export type Action =
  ExtractReturn<typeof toggleSidebar>|
  ExtractReturn<typeof updateChatChannel>|
  ExtractReturn<typeof updateMessages>|
  ExtractReturn<typeof updateUsers>|
  ExtractReturn<typeof updateChannels>|
  ExtractReturn<typeof connectTwilioClient>|
  ExtractReturn<typeof newMessage>|
  ExtractReturn<typeof updateTokens>;

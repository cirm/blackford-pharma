// @flow
import type { State } from './State';
import { toggleSidebar, updateChatChannel, updateMessages, updateUsers } from '../bChat/bChatActionCreators';
import { updateTokens } from '../bToken/bTokenActionCreators';
import { newMessage, twilioInvalid } from '../remote/bRemoteChannelActionCreators';
import { logout, getChannels, createChannel } from '../remote/bRemoteActionCreators';

// https://hackernoon.com/redux-flow-type-getting-the-maximum-benefit-from-the-fewest-key-strokes-5c006c54ec87
type _ExtractReturn<B, F: (...args: any[]) => B> = B;
export type ExtractReturn<F> = _ExtractReturn<*, F>;

export type Action =
  ExtractReturn<typeof toggleSidebar> |
  ExtractReturn<typeof updateChatChannel> |
  ExtractReturn<typeof updateMessages> |
  ExtractReturn<typeof updateUsers> |
  ExtractReturn<typeof updateChannels> |
  ExtractReturn<typeof twilioInvalid> |
  ExtractReturn<typeof newMessage> |
  ExtractReturn<typeof logout> |
  ExtractReturn<typeof getChannels> |
  ExtractReturn<typeof createChannel> |
  ExtractReturn<typeof updateTokens>;

export type Dispatch = (action: Action | ThunkAction) => void;
export type GetState = () => State;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) =>
  Promise<void> | void => void;

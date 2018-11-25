// @flow
import type { State } from './State';
import {
  toggleSidebar, updateChatChannel, updateUsers, updateChannelMessages,
} from '../chat/chatActionCreators';
import { updateTokens } from '../token/tokenActionCreators';
import {
  newMessage, updateChannelDescriptors, twilioInvalid, newSystemMessage,
} from '../remote/remoteChannelActionCreators';
import {
  logout, clientConnected, twilioConError, serverTokenError,
} from '../remote/remoteActionCreators';

export type Dispatch = (action: Action | ThunkAction) => any;
export type GetState = () => State;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any

export type Action =
$Call<typeof toggleSidebar, boolean> |
$Call<typeof updateChatChannel> |
  $Call<typeof updateUsers, any> |
  $Call<typeof updateChannelDescriptors> |
  $Call<typeof twilioInvalid> |
  $Call<typeof newMessage, any, string> |
  $Call<typeof newSystemMessage, any, string> |
  $Call<typeof logout> |
  $Call<typeof clientConnected, any> |
  $Call<typeof twilioConError, Error> |
  $Call<typeof serverTokenError, Error> |
  $Call<typeof updateChannelMessages, {channelSid: string, messages: any}> |
  $Call<typeof updateTokens, any> |
  ThunkAction;

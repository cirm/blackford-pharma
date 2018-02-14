// @flow
import { updateUsersAfterEvent } from '../bChat/bChatActionThunks';
import { newMessage } from './bRemoteChannelActionCreators';
import {TCONSTATE, TCHANADDED} from './bRemoteActionConstants';
import type { Dispatch, ChannelItem, TwilioClient } from '../types';

const logger = (payload) => { console.log(payload); };
const updateConnectionState = (data: string) => ({ type: TCONSTATE, data });
const newChannel = (data: ChannelItem) => (dispatch) => {
  mapRemoteChannelActions(data, dispatch);
  dispatch({ type: TCHANADDED, data });
};

const remoteActionsMap = {
  channelAdded: newChannel,
  connectionStateChanged: updateConnectionState,  
  // channelJoined: logger,
  channelInvited: logger,
  // channelUpdated: logger,
  channelRemoved: logger,
  // channelLeft: logger,
};

export const mapRemoteChatActions = (chat: TwilioClient, dispatch: Dispatch) =>
  Object.keys(remoteActionsMap).forEach((key: string) => {
    chat.on(key, (data) => { dispatch(remoteActionsMap[key](data)); });
  });


const remoteChannelActions = {
  messageAdded: newMessage,
  memberJoined: updateUsersAfterEvent,
  memberLeft: updateUsersAfterEvent,
};

const mappedChannels = new Set();

export const mapRemoteChannelActions = (channel: ChannelItem, dispatch: Dispatch) => {
  if (!mappedChannels.has(channel.sid)) {
    Object.keys(remoteChannelActions).forEach((key: string) => {
      channel.on(key, (data) => {
        dispatch(remoteChannelActions[key](data, channel.sid));
      });
    });
    mappedChannels.add(channel.sid);
  }
};

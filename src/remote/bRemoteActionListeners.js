// @flow
import { newMessage } from './bRemoteChannelActionCreators';
import { updateUsersAfterEvent } from '../bChat/bChatActionThunks';
import type { TwilioClient, ChannelItem } from '../types/Twilio';
import type { Dispatch } from '../types/Action';

const updateConnectionState = (data: string) => ({ type: 'TWILIO/CONNECTION_STATE', data });
const newChannel = (data: string) => ({ type: 'TWILIO/CHANNEL_ADDED', data });

const remoteActionsMap = {
  channelAdded: newChannel,
  connectionStateChanged: updateConnectionState,
  // channelJoined: logger,
  // channelInvited: logger,
  // channelUpdated: logger,
  // channelRemoved: logger,
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

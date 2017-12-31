// @flow
import mapKeys from 'lodash/fp/mapKeys';
import { newMessage } from './bRemoteChannelActionCreators';
import type { TwilioClient, ChannelItem } from '../types/Twilio';
import type { Dispatch } from '../types/Action';

const updateConnectionState = (data: string) => ({ type: 'TWILIO/CONNECTION_STATE', data });

const remoteActionsMap = {
  // channelAdded: logger,
  connectionStateChanged: updateConnectionState,
  // channelJoined: logger,
  // channelInvited: logger,
  // channelUpdated: logger,
  // channelRemoved: logger,
  // channelLeft: logger,
};

export const mapRemoteChatActions = (chat: TwilioClient, dispatch: Dispatch) =>
  mapKeys((key: string) => {
    chat.on(key, (data) => { dispatch(remoteActionsMap[key](data)); });
  })(remoteActionsMap);


const remoteChannelActions = {
  messageAdded: newMessage,
};

export const mapRemoteChannelActions = (channel: ChannelItem, dispatch: Dispatch) =>
  mapKeys((key: string) => {
    channel.on(key, (data) => {
      dispatch(remoteChannelActions[key](data));
    });
  })(remoteChannelActions);

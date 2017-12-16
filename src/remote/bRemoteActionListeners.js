// @flow
import mapKeys from 'lodash/fp/mapKeys';
import { newMessage } from './bRemoteChannelActionCreators';
import type { TwilioClient, ChannelItem } from '../types/Twilio';
import type { Dispatch } from '../types/Action';

const logger = data => console.log(data);

const remoteActionsMap = {
  channelAdded: logger,
  connectionStateChanged: logger,
  channelJoined: logger,
  channelInvited: logger,
  channelUpdated: logger,
  channelRemoved: logger,
  channelLeft: logger,
};

export const mapRemoteChatActions = (chat: TwilioClient) =>
  mapKeys((key: string) => {
    chat.on(key, data => remoteActionsMap[key](data));
  })(remoteActionsMap);


const remoteChannelActions = {
  messageAdded: newMessage,
};

export const mapRemoteChannelActions = (channel: ChannelItem, dispatch: Dispatch) =>
  mapKeys(key =>
    channel.on(key, data =>
      dispatch(remoteChannelActions[key](data))))(remoteChannelActions);

import mapKeys from 'lodash/fp/mapKeys';
import { newMessage } from './bRemoteChannelActionCreators';

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

export const mapRemoteChatActions = (chat, store) =>
  mapKeys(key =>
    chat.on(key, data =>
      remoteActionsMap[key](data)))(remoteActionsMap);


const remoteChannelActions = {
  messageAdded: newMessage,
};

export const mapRemoteChannelActions = (channel, dispatch) =>
  mapKeys(key =>
    channel.on(key, data =>
      dispatch(remoteChannelActions[key](data))))(remoteChannelActions);

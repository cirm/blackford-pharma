// @flow
import Chat from 'twilio-chat';
import Promise from 'bluebird';
import { LOGOUT, TCONNECT, TCREATE_CHANNEL, TGET_CHANNELS } from './bRemoteActionConstants';
import { updateChannels } from './bRemoteChannelActionCreators';
import { mapRemoteChatActions } from './bRemoteActionListeners';
import type { tokens as Tokens } from '../types/General';
import type { Dispatch, Action } from '../types/Action';
import type { TwilioClient, ChannelPaginator, ChannelDescriptor } from '../types/Twilio';


let client;

const connectChat = async (tokens: Tokens, dispatch: Dispatch) => {
  try {
    const tc = await Chat.create(tokens.chatToken);
    mapRemoteChatActions(tc, dispatch);
    const channels: Array<ChannelPaginator<ChannelDescriptor>> = await Promise.all([
      tc.getUserChannelDescriptors(), tc.getPublicChannelDescriptors(),
    ]);
    dispatch(updateChannels({ private: channels[0].state, public: channels[1].state }));
    return tc;
  } catch (e) {
    return undefined;
  }
};

const getPublicChannels = async (tc, dispatch) => {
  const publicChats = await tc.getSubscribedChannels();
  dispatch({ type: 'PUBLIC_CHANNELS', data: publicChats });
};

const updateTwilioChannels = async (tc: TwilioClient, dispatch: Dispatch) => {
  const channels: Array<ChannelPaginator<ChannelDescriptor>> = await Promise.all([
    tc.getUserChannelDescriptors(), tc.getPublicChannelDescriptors(),
  ]);
  dispatch(updateChannels({ private: channels[0].state, public: channels[1].state }));
};

const connectedStatuses = ['connected', 'connecting'];

const middleware = store => next => async (action: Action) => {
  if (action.meta && action.meta.twilio) {
    console.log('twilio');
    if (client) console.log(client.connectionState);
    if (client) console.log(connectedStatuses.includes(client.connectionState));
    if (action.type === TCONNECT) {
      if (!client || (!(connectedStatuses.includes(client.connectionState)))) {
        client = await connectChat(action.data, store.dispatch);
      }
      return next(action);
    } else if (client && connectedStatuses.includes(client.connectionState)) {
      console.log('pongerino');
      switch (action.type) {
        case LOGOUT:
          console.log('logout');
          await client.shutDown();
          client = undefined;
          return next(action);
        case TCREATE_CHANNEL:
          console.log(action.data);
          await client.createChannel({ uniqueName: action.data.chatName, friendlyName: action.data.chatName, isPrivate: action.data.isPrivate });
          return next(action);
        case 'TWILIO/UPDATE_TOKEN':
          console.log('updateToken');
          return next(action);
        case TGET_CHANNELS:
          console.log('getTwilioChannels');
          updateTwilioChannels(client, store.dispatch);
          return next(action);
        default:
          return next(action);
      }
    }
  }
  return next(action);
};

export default middleware;

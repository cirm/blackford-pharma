// @flow

import Chat from 'twilio-chat';
import Promise from 'bluebird';
import differenceBy from 'lodash/fp/differenceBy';
import { putTokenApi } from '../bToken/bTokenApi';
import { mapRemoteChatActions } from './bRemoteActionListeners';
import { updateTokens } from '../bToken/bTokenActionCreators';
import { updateChannels, newMessage } from './bRemoteChannelActionCreators';
import { clientConnected, twilioConError, serverTokenError } from './bRemoteActionCreators';
import type { ThunkAction, Dispatch } from '../types/Action';
import type { TwilioClient, ChannelPaginator, ChannelDescriptor } from '../types/Twilio';
import type { NewChannel } from '../types/General';

const connectedStatuses = ['connected', 'connecting'];

const processPaginator = async (paginatedObject, readData) => {
  console.log(paginatedObject, readData)
  const processedItems = readData ? [...paginatedObject.state.items, ...readData]: [...paginatedObject.state.items]; 
  if (paginatedObject.hasNextPage) {
    const nextPage = await paginatedObject.nextPage();
    return processPaginator(nextPage, processedItems);
  }
  return processedItems;
} 


export const updateTwilioChannels = (): ThunkAction => async (dispatch: Dispatch, getState) => {
  const state = getState();
  if (connectedStatuses.includes(state.remote.connectionState) && state.remote.client) {
    const channels: Array<ChannelPaginator<ChannelDescriptor>> = await Promise.all([
      state.remote.client.getUserChannelDescriptors().then(resp => processPaginator(resp)),
      state.remote.client.getPublicChannelDescriptors().then(resp => processPaginator(resp)),
    ]);
    dispatch(updateChannels({private: differenceBy('sid')(channels[0], channels[1]), public: channels[1] }));
  }
};

export const connectClient = (tokens: {chatToken: string}): ThunkAction =>
  async (dispatch: Dispatch) => {
    try {
      const connectedClient: TwilioClient = await Chat.create(tokens.chatToken);
      mapRemoteChatActions(connectedClient, dispatch);
      dispatch(clientConnected(connectedClient));
      dispatch(updateTwilioChannels());
    } catch (e) {
      dispatch(twilioConError(e));
    }
  };

export const renewToken = (apiToken: string): ThunkAction => async (dispatch: Dispatch) => {
  let tokens;
  try {
    tokens = await putTokenApi({ apiToken });
  } catch (e) {
    dispatch(serverTokenError(e));
  }
  if (!tokens) return;
  dispatch(updateTokens(tokens));
  dispatch(connectClient(tokens));
};

export const createTwilioChannel = (payload: NewChannel): ThunkAction =>
  async (dispatch, getState) => {
    const state = getState();
    if (state.remote.connectionState === 'connected' && state.remote.client) {
      await state.remote.client.createChannel({
        uniqueName: payload.channelName,
        friendlyName: payload.channelName,
        isPrivate: payload.isPrivate,
      });
      dispatch(updateTwilioChannels());
    }
  };


export const newMessageEvent = (messageItem, sid): ThunkAction => async (dispatch, getState) => {
  dispatch(newMessage(messageItem, sid));
  const state = getState();
  if (connectedStatuses.includes(state.remote.connectionState) && state.remote.client) {
    const privateChannels = await state.remote.client.getUserChannelDescriptors().then(resp => processPaginator(resp));
    dispatch(updateChannels({ private:  differenceBy('sid')(privateChannels, state.chat.channels.public), public: state.chat.channels.public }));
  }
};

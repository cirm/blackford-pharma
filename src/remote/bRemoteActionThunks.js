// @flow

import Chat from 'twilio-chat';
import differenceBy from 'lodash/fp/differenceBy';
import { putTokenApi } from '../bToken/bTokenApi';
import { mapRemoteChatActions } from './bRemoteActionListeners';
import { updateTokens } from '../bToken/bTokenActionCreators';
import { updateChannelDescriptors, newMessage } from './bRemoteChannelActionCreators';
import { clientConnected, twilioConError, serverTokenError } from './bRemoteActionCreators';
import type {
  ThunkAction,
  Dispatch,
  GetState,
  TwilioClient,
  NewChannel,
  MessageItem,
  ChannelDescriptor,
  ChannelPaginator
} from '../types';

const connectedStatuses = ['connected', 'connecting'];

const processPaginator = async (paginatedObject, readData) => {
  const processedItems = readData ? [...paginatedObject.state.items, ...readData] : [...paginatedObject.state.items];
  if (paginatedObject.hasNextPage) {
    const nextPage = await paginatedObject.nextPage();
    return processPaginator(nextPage, processedItems);
  }
  return processedItems;
};


export const updateTwilioChannelDescriptors = (): ThunkAction =>
  async (dispatch: Dispatch, getState: GetState): ThunkAction => {
    const state = getState();
    if (connectedStatuses.includes(state.remote.connectionState) && state.remote.client) {
      const channels: Array<ChannelDescriptor> = await state.remote.client.getUserChannelDescriptors()
        .then(resp => processPaginator(resp));
      dispatch(updateChannelDescriptors(channels));
    }
  };

export const connectClient = (tokens: { chatToken: string }): ThunkAction =>
  async (dispatch: Dispatch) => {
    try {
      const connectedClient: TwilioClient = await Chat.create(tokens.chatToken);
      mapRemoteChatActions(connectedClient, dispatch);
      dispatch(clientConnected(connectedClient));
      dispatch(updateTwilioChannelDescriptors());
    } catch (e) {
      dispatch(twilioConError(e));
    }
  };

export const renewToken = (apiToken: string): ThunkAction => async (dispatch: Dispatch): ThunkAction => {
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
      dispatch(updateTwilioChannelDescriptors());
    }
  };

export const newMessageThunk = (messageItem: MessageItem, sid: string): ThunkAction =>
  (dispatch: Dispatch, getState: GetState) => {
    const state = getState();
    if (sid !== state.chat.currentChannel.sid) {
      dispatch(updateTwilioChannelDescriptors());
    }
    dispatch(newMessage(messageItem, sid));
  };
// @flow

import Chat from 'twilio-chat';
import Promise from 'bluebird';
import { putTokenApi } from '../bToken/bTokenApi';
import { mapRemoteChatActions } from './bRemoteActionListeners';
import { updateTokens } from '../bToken/bTokenActionCreators';
import { updateChannels } from './bRemoteChannelActionCreators';
import { clientConnected, twilioConError, serverTokenError } from './bRemoteActionCreators';
import type { ThunkAction, Dispatch } from '../types/Action';
import type { TwilioClient, ChannelPaginator, ChannelDescriptor } from '../types/Twilio';
import type { NewChannel } from '../types/General';

const connectedStatuses = ['connected', 'connecting'];

export const updateTwilioChannels = (): ThunkAction => async (dispatch: Dispatch, getState) => {
  const state = getState();
  if (connectedStatuses.includes(state.remote.connectionState) && state.remote.client) {
    const channels: Array<ChannelPaginator<ChannelDescriptor>> = await Promise.all([
      state.remote.client.getUserChannelDescriptors(), state.remote.client.getPublicChannelDescriptors(),
    ]);
    dispatch(updateChannels({ private: channels[0].state, public: channels[1].state }));
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

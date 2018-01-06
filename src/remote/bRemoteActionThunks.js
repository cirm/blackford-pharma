// @flow

import Chat from 'twilio-chat';
import Promise from 'bluebird';
import { putTokenApi } from '../bToken/bTokenApi';
import { mapRemoteChatActions } from './bRemoteActionListeners';
import { updateTokens } from '../bToken/bTokenActionCreators';
import { updateChannels } from './bRemoteChannelActionCreators';
import type { ThunkAction, Dispatch } from '../types/Action';
import type { TwilioClient, ChannelPaginator, ChannelDescriptor } from '../types/Twilio';

const connectedStatuses = ['connected', 'connecting'];

export const updateTwilioChannels = (): ThunkAction => async (dispatch: Dispatch, getState) => {
  const state = getState();
  if (!(connectedStatuses.includes(state.remote.connectionSate))) {
    const channels: Array<ChannelPaginator<ChannelDescriptor>> = await Promise.all([
      state.remote.client.getUserChannelDescriptors(), state.remote.client.getPublicChannelDescriptors(),
    ]);
    dispatch(updateChannels({ private: channels[0].state, public: channels[1].state }));
  }
};

export const connectClient = (tokens): ThunkAction => async (dispatch: Dispatch) => {
  try {
    const connectedClient: TwilioClient = await Chat.create(tokens.chatToken);
    mapRemoteChatActions(connectedClient, dispatch);
    dispatch({ type: 'TWILIO/CLIENT_CONNECTED', data: { client: connectedClient } });
    dispatch(updateTwilioChannels());
  } catch (e) {
    dispatch({ type: 'TWILIO/CONNECTION_ERROR', data: e });
  }
};

export const renewToken = (apiToken: string): ThunkAction => async (dispatch: Dispatch) => {
  let tokens;
  try {
    tokens = await putTokenApi({ apiToken });
  } catch (e) {
    console.log(e.toString());
  }
  if (!tokens) return;
  dispatch(updateTokens(tokens));
  dispatch(connectClient(tokens));
};

export const createTwilioChannel = (payload): ThunkAction => async (dispatch, getState) => {
  const state = getState();
  if (state.remote.connectionState === 'connected') {
    await state.remote.client.createChannel({ uniqueName: payload.chatName, friendlyName: payload.chatName, isPrivate: payload.isPrivate });
    dispatch(updateTwilioChannels());
  }
};

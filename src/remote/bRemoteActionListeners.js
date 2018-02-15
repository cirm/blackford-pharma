// @flow
import { updateUsersAfterEvent } from '../bChat/bChatActionThunks';
import { updateChatChannel, toggleSidebar } from '../bChat/bChatActionCreators';
import { newMessage } from './bRemoteChannelActionCreators';
import { updateTwilioChannelDescriptors } from './bRemoteActionThunks';
import {TCONSTATE, TCHANADDED} from './bRemoteActionConstants';
import type { Dispatch, ChannelItem, TwilioClient, MessageItem, ThunkAction, GetState } from '../types';

const logger = (payload) => { console.log(payload); };
const updateConnectionState = (data: string) => ({ type: TCONSTATE, data });
const updateChannelsAfterEvent = (data: ChannelItem) => (dispatch) => {
  mapRemoteChannelActions(data, dispatch);
  dispatch({ type: TCHANADDED, data });
  dispatch(updateTwilioChannelDescriptors());
};

export const newMessageThunk = (messageItem: MessageItem, sid: string): ThunkAction =>
  (dispatch: Dispatch, getState: GetState) => {
    const state = getState();
    if (!state.chat.currentChannel || sid !== state.chat.currentChannel.sid) {
      dispatch(updateTwilioChannelDescriptors());
    }
    dispatch(newMessage(messageItem, sid));
};

const channelRemoved = (channel: ChannelItem) => (dispatch) => {
  dispatch(updateTwilioChannelDescriptors());
  dispatch(updateChatChannel(undefined));
  dispatch(toggleSidebar(true));
}

const remoteActionsMap = {
  channelAdded: updateChannelsAfterEvent,
  connectionStateChanged: updateConnectionState,  
  // channelJoined: logger,
  channelInvited: logger,
  // channelUpdated: logger,
  channelRemoved: channelRemoved,
  // channelLeft: logger,
};

export const mapRemoteChatActions = (chat: TwilioClient, dispatch: Dispatch) =>
  Object.keys(remoteActionsMap).forEach((key: string) => {
    chat.on(key, (data) => { dispatch(remoteActionsMap[key](data)); });
  });


const remoteChannelActions = {
  messageAdded: newMessageThunk,
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

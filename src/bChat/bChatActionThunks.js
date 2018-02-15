// @flow

import { mapRemoteChannelActions } from '../remote/bRemoteActionListeners';
import { toggleSidebar, updateChatChannel, updateUsers, updateChannelMessages } from './bChatActionCreators';
import { push } from 'react-router-redux';
import { updateTwilioChannelDescriptors } from '../remote/bRemoteActionThunks';
import { newSystemMessage } from '../remote/bRemoteChannelActionCreators';
import type { ThunkAction, ChatMessage, ChannelDescriptor, ChannelItem, Dispatch, GetState } from '../types';


export const loadChannel = (channelDescriptor: ChannelDescriptor): ThunkAction =>
  async (dispatch) => {
    dispatch(toggleSidebar(false));
    let Channel: ChannelItem = await channelDescriptor.getChannel();
    dispatch(updateChatChannel(Channel));
    if (Channel.status !== 'joined') {
      Channel = await Channel.join();
    }
    dispatch(updateTwilioChannelDescriptors());
    mapRemoteChannelActions(Channel, dispatch);
    const Messages = await Channel.getMessages(1000);
    const messages: ChatMessage[] = Messages.items.map(Message => ({
      author: Message.author,
      sid: Message.sid,
      body: Message.body,
      index: Message.index,
      timestamp: Message.timestamp,
    }));
    dispatch(updateChannelMessages({ channelSid: Channel.sid, messages }));
    const Members = await Channel.getMembers();
    dispatch(updateUsers(Members));
  };

export const inviteUsers2Channel = (userArr: string[]) =>
  async (dispatch: Dispatch, getState: GetState) => {
    const state = await getState();
    await userArr.forEach(async (user) => {
      try {
        await state.chat.currentChannel.add(user);
      } catch (e) {
        if (e.message === 'User not found') {
          const timestamp = new Date();
          dispatch(newSystemMessage(
            {
              author: '*SYSTEM*',
              body: `ACCESS VIOLATION - USER "${user}" not found!`,
              timestamp,
              sid: `SYSTEM_${timestamp.getTime()}`,
              index: state.chat.channelMessages[state.chat.currentChannel.sid].length || 0,
            },
            state.chat.currentChannel.sid,
          ));
        }
      }
    });
  };

export const unkCommand = () => async (dispatch: Dispatch, getState: GetState) => {
  const state = await getState();
  const timestamp = new Date();
  dispatch(newSystemMessage(
    {
      author: '*SYSTEM*',
      body: 'UNK COMMAND - only "/invite, /leave or /kick username" are whitelisted!',
      timestamp,
      sid: `SYSTEM_${timestamp.getTime()}`,
      index: state.chat.channelMessages[state.chat.currentChannel.sid].length || 0,
    },
    state.chat.currentChannel.sid,
  ));
};

export const kickUsersFromChannel = (userArr: string[]) => async (dispatch: Dispatch, getState: GetState) => {
  const state = await getState();
  if (state.chat.currentChannel.createdBy !== state.token.identity) {
    const timestamp = new Date();
    dispatch(newSystemMessage({
      author: '*SYSTEM*',
      body: 'ACCESS VIOLATION - Must be creator to /kick',
      timestamp,
      sid: `SYSTEM_${timestamp.getTime()}`,
      index: state.chat.channelMessages[state.chat.currentChannel.sid].length || 0,
    },
      state.chat.currentChannel.sid,
    ));
  } else {
    await userArr.forEach(async (user) => {
      try {
        await state.chat.currentChannel.removeMember(user);
      } catch (e) {
        if (e.message === 'User not member of channel') {
          const timestamp = new Date();
          dispatch(newSystemMessage(
            {
              author: '*SYSTEM*',
              body: `ACCESS VIOLATION - USER "${user}" not member of channel!`,
              timestamp,
              sid: `SYSTEM_${timestamp.getTime()}`,
              index: state.chat.channelMessages[state.chat.currentChannel.sid].length || 0,
            },
            state.chat.currentChannel.sid,
          ));
        }
      }
    });
  }
};

export const updateUsersAfterEvent = (payload: any, sid: string) => async (dispatch: Dispatch, getState: GetState) => {
  const state = getState();
  if (sid === state.chat.currentChannel.sid) {
    const Members = await state.chat.currentChannel.getMembers();
    dispatch(updateUsers(Members));
  }
};

export const leaveChannel = (channelSid: string) => async (dispatch: Dispatch, getState: GetState) => {
const state = getState();
if (!channelSid) {
  await state.chat.currentChannel.delete();
  dispatch(updateChatChannel(undefined));
  dispatch(toggleSidebar(true));
  dispatch(push('/'));
} else {
  await state.chat.channels
    .filter(channelDescriptor => channelSid === channelDescriptor.sid)
    .forEach(channelDescriptor => channelDescriptor.getChannel().then(channel => channel.delete()));
  
  }
  dispatch(updateTwilioChannelDescriptors());
}
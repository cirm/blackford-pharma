// @flow

import { mapRemoteChannelActions } from '../remote/bRemoteActionListeners';
import { toggleSidebar, updateChatChannel, updateUsers, updateChannelMessages } from './bChatActionCreators';
import { updateTwilioChannels } from '../remote/bRemoteActionThunks';
import { newSystemMessage } from '../remote/bRemoteChannelActionCreators';
import type { ThunkAction } from '../types/Action';
import type { ChatMessage } from '../types/General';
import type { ChannelDescriptor, ChannelItem } from '../types/Twilio';


export const loadChannel = (channelDescriptor: ChannelDescriptor): ThunkAction =>
  async (dispatch) => {
    dispatch(toggleSidebar(false));
    let Channel: ChannelItem = await channelDescriptor.getChannel();
    dispatch(updateChatChannel(Channel));
    if (Channel.status !== 'joined') {
      Channel = await Channel.join();
    }
    dispatch(updateTwilioChannels());
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

export const inviteUsers2Channel = userArr =>
  async (dispatch, getState) => {
    const state = await getState();
    await userArr.forEach(async (user) => {
      try {
        await state.chat.currentChannel.add(user);
      } catch (e) {
        if (e.message === 'User not found') {
          dispatch(newSystemMessage(
            {
              author: '*SYSTEM*',
              body: `ACCESS VIOLATION - USER "${user}" not found!`,
              timestamp: Date.now(),
              sid: `SYSTEM ${Date.now()}`,
              index: state.chat.channelMessages[state.chat.currentChannel.sid].length || 0,
            },
            state.chat.currentChannel.sid,
          ));
        }
      }
    });
  };

export const unkCommand = () => async (dispatch, getState) => {
  const state = await getState();
  dispatch(newSystemMessage(
    {
      author: '*SYSTEM*',
      body: 'UNK COMMAND - only "/invite or /kick username" is whitelisted!',
      timestamp: Date.now(),
      sid: `SYSTEM ${Date.now()}`,
      index: state.chat.channelMessages[state.chat.currentChannel.sid].length || 0,
    },
    state.chat.currentChannel.sid,
  ));
};

export const kickUsersFromChannel = userArr => async (dispatch, getState) => {
  const state = await getState();
  if (state.chat.currentChannel.createdBy !== state.token.identity) {
    dispatch(newSystemMessage(
      {
        author: '*SYSTEM*',
        body: 'ACCESS VIOLATION - Must be creator to /kick',
        timestamp: Date.now(),
        sid: `SYSTEM ${Date.now()}`,
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
          dispatch(newSystemMessage(
            {
              author: '*SYSTEM*',
              body: `ACCESS VIOLATION - USER "${user}" not member of channel!`,
              timestamp: Date.now(),
              sid: `SYSTEM ${Date.now()}`,
              index: state.chat.channelMessages[state.chat.currentChannel.sid].length || 0,
            },
            state.chat.currentChannel.sid,
          ));
        }
      }
    });
  }
};

export const updateUsersAfterEvent = (payload, sid) => async (dispatch, getState) => {
  const state = getState();
  if (sid === state.chat.currentChannel.sid) {
    const Members = await state.chat.currentChannel.getMembers();
    dispatch(updateUsers(Members));
  }
};

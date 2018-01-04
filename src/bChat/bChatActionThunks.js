// @flow

import { mapRemoteChannelActions } from '../remote/bRemoteActionListeners';
import { toggleSidebar, updateChatChannel, updateMessages, updateUsers } from './bChatActionCreators';
import type { ThunkAction } from '../types/Action';
import type { ChannelDescriptor, ChannelItem } from '../types/Twilio';

export const loadChannel = (channelDescriptor: ChannelDescriptor): ThunkAction => async (dispatch) => {
  dispatch(toggleSidebar(false));
  let Channel: ChannelItem = await channelDescriptor.getChannel();
  dispatch(updateChatChannel(Channel));
  if (Channel.status !== 'joined') {
    Channel = await Channel.join();
  }
  dispatch({ type: 'TWILIO/GET_CHANNELS', meta: { twilio: true } });
  mapRemoteChannelActions(Channel, dispatch);
  const Messages = await Channel.getMessages(1000);
  const messages = Messages.items.map(Message => ({
    author: Message.author,
    sid: Message.sid,
    body: Message.body,
    index: Message.index,
    timestamp: Message.timestamp,
  }));
  dispatch({ type: 'UPDATE_CHANNEL_MESSAGES', data: { channel: Channel.sid, messages } });
  const Members = await Channel.getMembers();
  dispatch(updateUsers(Members));
};

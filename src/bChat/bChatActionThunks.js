// @flow

import { mapRemoteChannelActions } from '../remote/bRemoteActionListeners';
import { toggleSidebar, updateChatChannel, updateUsers, updateChannelMessages } from './bChatActionCreators';
import { getChannels } from '../remote/bRemoteActionCreators';
import type { ThunkAction } from '../types/Action';
import type { ChatMessage } from '../types/General';
import type { ChannelDescriptor, ChannelItem } from '../types/Twilio';


const loadChannel = (channelDescriptor: ChannelDescriptor): ThunkAction => async (dispatch) => {
  dispatch(toggleSidebar(false));
  let Channel: ChannelItem = await channelDescriptor.getChannel();
  dispatch(updateChatChannel(Channel));
  if (Channel.status !== 'joined') {
    Channel = await Channel.join();
  }
  dispatch(getChannels());
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

export default loadChannel;

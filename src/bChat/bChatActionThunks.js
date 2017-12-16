// @flow

import { mapRemoteChannelActions } from '../remote/bRemoteActionListeners';
import { toggleSidebar, updateChatChannel, updateMessages, updateUsers } from './bChatActionCreators';
import type { ThunkAction } from '../types/Action';
import type { ChannelDescriptor, ChannelItem } from '../types/Twilio';

export const loadChannel = (channelDescriptor: ChannelDescriptor): ThunkAction => async (dispatch) => {
  dispatch(toggleSidebar(false));
  const Channel: ChannelItem = await channelDescriptor.getChannel();
  dispatch(updateChatChannel(Channel));
  mapRemoteChannelActions(Channel, dispatch);
  const Messages = await Channel.getMessages(100);
  dispatch(updateMessages(Messages));
  const Members = await Channel.getMembers();
  dispatch(updateUsers(Members));
};

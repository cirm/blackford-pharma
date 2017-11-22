import { mapRemoteChannelActions } from '../remote/bRemoteActionListeners';
import { toggleSidebar, updateChatChannel, updateMessages, updateUsers } from './bChatActionCreators';

export const loadChannel = channelDescriptor => async (dispatch) => {
  dispatch(toggleSidebar(false));
  const Channel = await channelDescriptor.getChannel();
  dispatch(updateChatChannel(Channel));
  mapRemoteChannelActions(Channel, dispatch);
  const Messages = await Channel.getMessages(100);
  dispatch(updateMessages(Messages));
  const Members = await Channel.getMembers();
  dispatch(updateUsers(Members));
};

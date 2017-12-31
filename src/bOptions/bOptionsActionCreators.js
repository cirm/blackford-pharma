import { TCREATE_CHANNEL } from '../remote/bRemoteActionConstants';

const createNewChat = (chatName, open) => ({
  type: TCREATE_CHANNEL,
  data: { chatName, isPrivate: open },
  meta: { twilio: true },
});

export default createNewChat;

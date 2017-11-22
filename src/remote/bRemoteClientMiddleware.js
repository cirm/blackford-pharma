import Promise from 'bluebird';
import { mapRemoteChatActions } from './bRemoteActionListeners';

let client = '';

export default Chat => store => next => async (action) => {
  if (action.meta && action.meta.chat) {
    if (action.type === 'CONNECT') {
      if (!client) {
        try {
          client = await Chat.create(action.data);
          mapRemoteChatActions(client, store);
          const channels = await Promise.all([
            client.getUserChannelDescriptors(), client.getPublicChannelDescriptors(),
          ]);
          store.dispatch({ type: 'UPDATE_CHANNELS', data: { private: channels[0], public: channels[1] } });
        } catch (e) {
          store.dispatch({ type: 'TWILIO_INVALID' });
        }
      }
      return next(action);
    }
    if (client) {
      if (action.type === 'LOGOUT') {
        await client.shutdown();
        return next(action);
      }
    }
  }
  return next(action);
};

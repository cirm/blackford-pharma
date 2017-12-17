// @flow
import Chat from 'twilio-chat';
import Promise from 'bluebird';
import { mapRemoteChatActions } from './bRemoteActionListeners';
import { updateChannels, twilioInvalid } from './bRemoteChannelActionCreators';
import { putTokenApi } from '../bToken/bTokenApi';
import { updateTokens } from '../bToken/bTokenActionCreators';
import type { ThunkAction, Dispatch } from '../types/Action';
import type { tokens as Tokens } from '../types/General';
import type { TwilioClient, ChannelPaginator, ChannelDescriptor, ChannelItem } from '../types/Twilio';

export const renewToken = (apiToken: string): ThunkAction => async (dispatch: Dispatch) => {
  let tokens;
  try {
    tokens = await putTokenApi({ apiToken });
  } catch (e) {
    console.log(e.toString());
  }
  if (!tokens) return;
  dispatch(updateTokens(tokens));
  try {
    const client: TwilioClient = await Chat.create(tokens.chatToken);
    mapRemoteChatActions(client);
    console.log(await client.getPublicChannelDescriptors());
    const channels: Array<ChannelPaginator<ChannelDescriptor>> = await Promise.all([
      client.getUserChannelDescriptors(), client.getPublicChannelDescriptors(),
    ]);
    console.log(channels);
    dispatch(updateChannels({ private: channels[0].state, public: channels[1].state }));
  } catch (e) {
    dispatch(twilioInvalid());
  }
};

export const connectChat = (tokens: Tokens): ThunkAction => async (dispatch) => {
  try {
    const client: TwilioClient = await Chat.create(tokens.chatToken);
    mapRemoteChatActions(client);
    console.log(await client.getPublicChannelDescriptors());
    const channels: Array<ChannelPaginator<ChannelDescriptor>> = await Promise.all([
      client.getUserChannelDescriptors(), client.getPublicChannelDescriptors(),
    ]);
    console.log(channels);
    dispatch(updateChannels({ private: channels[0].state, public: channels[1].state }));
  } catch (e) {
    dispatch(twilioInvalid());
  }
};

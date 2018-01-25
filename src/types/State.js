// @flow
import type { ChannelApiResponse, ChannelItem, MembersItem, TwilioClient } from './Twilio';
import type { ChatMessage } from './General';

export type TokenState = {
  +identity?: string,
  +id?: number,
  +roles?: string[],
  +chatToken?: string,
  +apiToken?: string,
};

export type ChatState = {
    +sidebar: boolean,
    +userList: Array<MembersItem>,
    +currentChannel?: ChannelItem,
    +channelMessages: {[key: ?string]: Array<ChatMessage>},
    +channels?: ChannelApiResponse,
  };

export type RouterState = {
  location: {
    pathname: string,
  },
};

export type RemoteState = {
  connectionState: 'disconnected' | 'connecting' | 'connected' | 'error' | 'denied',
  +client?: TwilioClient,
}

export type State = {
  chat: ChatState,
  token: TokenState,
  router: RouterState,
  remote: RemoteState,
};

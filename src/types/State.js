// @flow
import type { ChannelApiResponse, ChannelItem, MessageItem, MembersItem } from './Twilio';
import type { ChatMessage } from './General';

export type TokenState = {
  +identity?: string,
  +id?: number,
  +roles?: string[],
  +chatToken?: string,
  +apiToken?: string,
};

export type ChatState = {
    +connectionState: 'disconnected' | 'connecting' | 'connected' | 'error' | 'denied',
    +sidebar: boolean,
    +userList: Array<MembersItem>,
    +messages: Array<MessageItem>,
    +currentChannel?: ChannelItem,
    +channelMessages: {[key: ?string]: Array<ChatMessage>},
    +channels?: ChannelApiResponse,
  };

export type RouterState = {
  location: {
    pathname: string,
  },
};

export type State = {
  chat: ChatState,
  token: TokenState,
  router: RouterState,
};

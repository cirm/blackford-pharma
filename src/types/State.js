// @flow
import type { ChannelApiResponse, ChannelItem, MessageApiResponse } from './Twilio';

export type TokenState = {
  +identity?: string,
  +id?: number,
  +roles?: string[],
  +chatToken?: string,
  +apiToken?: string,
};

export type ChatState = {
    +sidebar: boolean,
    +userList: string[],
    +messages: MessageApiResponse,
    +currentChannel: ?ChannelItem,
    +channels: ChannelApiResponse,
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

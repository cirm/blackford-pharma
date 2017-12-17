// @flow
import type { ChannelApiResponse, ChannelItem, PaginatorItem, MessageItem, MembersItem } from './Twilio';

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
    +messages?: PaginatorItem<MessageItem>,
    +currentChannel?: ChannelItem,
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

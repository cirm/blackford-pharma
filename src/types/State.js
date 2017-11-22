// @flow
import type { channelApiResponse, channelItem, messageApiResponse } from './Twilio';

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
    +messages: messageApiResponse,
    +currentChannel?: channelItem,
    +channels: channelApiResponse,
  };

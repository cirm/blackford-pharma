// @flow
export type ChannelItem = {
  createdBy: string,
  dateCreated: Date,
  dateUpdated: Date,
  friendlyName: string,
  isPrivate: boolean,
  lastConsumedMessageIndes: number,
  sid: string,
  status: 'unknown' | 'known' | 'invited' | 'joined' | 'failed',
  type: 'public' | 'private',
  uniqueName: string,
  add: (identity: string) => Promise<void|Error|SessionError>,
  advanceLastConsumedMessageIndex: (index: number) => Promise<number|Error|SessionError>,
  decline: () => Promise<ChannelItem|SessionError>,
  delete: () => Promise<ChannelItem|SessionError>,
  on: (key: string, action: () => void) => void,
  getMembersCount: () => Promise<number>,
  getMessagesCount: () => Promise<number>,
  getUnconsumedMessagesCount: () => Promise<number>,
  getUserDescriptors: () => Promise<PaginatorItem<UserDescriptor>>,
  invite: (identity: string) => Promise<void|Error|SessionError>,
  getMessages: (pagesize?: number) => Promise<PaginatorItem<MessageItem>>,
  getMembers: () => Promise<MembersItem[]>,
  updateUniqueName: () => Promise<ChannelItem|SessionError>,
  updateLastConsumedMessageIndex: (index: number|null) => Promise<number|Error|SessionError>,
  updateFriendlyName: (name: string) => Promise<ChannelItem|SessionError>,
  typing: () => Promise<void|SessionError>,
  setNoMessagesConsumed: () => Promise<number>,
  setAllMessagesConsumed: () => Promise<number>,
  sendMessage: (message: string) => Promise<string>,
  removeMember: (member: string) => Promise<void|Error|SessionError>,
  leave: () => Promise<ChannelItem|SessionError>,  
  join: () => Promise<ChannelItem|SessionError>,
};

export type PaginatorItem<T> = {
  items: Array<T>,
  nextPage: () => Promise<Array<T>>,
  prevPage: () => Promise<Array<T>>,
  hasNextPage: boolean,
  hasPrevPage: boolean,
};

export type ChannelPaginator<T> = {
  state: { items: Array<T>,
    nextPage: () => Promise<Array<T>>,
    prevPage: () => Promise<Array<T>>,
    hasNextPage: boolean,
    hasPrevPage: boolean,
  }
}

export type MessageItem = {
    author: string,
    body: string,
    channel: ChannelItem,
    dateUpdated: Date,
    index: number,
    sid: string,
    timestamp: Date,
    type: string,
};

export type SessionError = {
  code: number,
  message: string,
};

export type UserDescriptor = {
  identity: string,
  friendlyName: string,
  online: boolean,
  notifiable: boolean,
  subscribe: () => Promise<UserItem>,
};

export type UserItem = {
  identity: string,
  friendlyName: string,
  online: boolean,
  notifiable: boolean,
  unsubscribe: () => Promise<void>,
  updateFriendlyName: (friendlyName: string) => Promise<UserItem|Error|SessionError>
};

export type MembersItem = {
  channel: ChannelItem,
  identity: string,
  isTyping: boolean,
  sid: string,
  lastConsumedMessageIndes: number,
  lastConsumptionTimestamp: Date,
  getUser: () => Promise<UserItem>,
  getUserDescriptor: () => Promise<UserDescriptor>,
  remove: () => Promise<void>,
};

export type ChannelDescriptor = {
  getChannel: () => Promise<ChannelItem>
};

export type TwilioClient = {
  getSubscribedChannels: () => Promise<PaginatorItem<ChannelItem>>,
  getPublicChannelDescriptors: () => Promise<ChannelPaginator<ChannelDescriptor>>,
  getUserChannelDescriptors: () => Promise<ChannelPaginator<ChannelDescriptor>>,
  shutDown: () => void,
  connectionState: 'disconnected' | 'connecting' | 'connected' | 'error' | 'denied',
  user: UserItem,
  version: string,
  channels: Map<string, ChannelItem>,
  getUserDescriptor: (identity: string) => Promise<UserDescriptor>,
  on: (key: string, action: () => void) => void,
  getChannelBySid: (channelSid: string) => Promise<ChannelItem>,
  getChannelByUniqueName: (uniqueName: string) => Promise<ChannelItem>,
  getUser: (identity: string) => Promise<UserItem>,
  create: (token: string) => Promise<TwilioClient>,
};

export type ChannelApiResponse = {
  private: PaginatorItem<ChannelDescriptor>,
  public: PaginatorItem<ChannelDescriptor>,
};

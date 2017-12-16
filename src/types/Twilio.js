// @flow
export type ChannelItem = {
  channel: string,
  createdBy: string,
  dateCreated: Date,
  dateUpdated: Date,
  friendlyName: string,
  isPrivate: boolean,
  membersCount: number,
  lastConsumedMessageIndes: number,
  messagesCount: number,
  sid: string,
  status: string,
  type: string,
  uniqueName: string,
  on: (key: string, action: () => void) => void,
  getMessages: (pagesize?: number) => Promise<MessageApiResponse>,
  getMembers: () => Promise<MembersItem[]>,
};

export type MessageItem = {
  state: {
    author: string,
    body: string,
    dateUpdated: Date,
    index: number,
    sid: string,
    timestamp: Date,
    type: string,
  }
};

export type MessageApiResponse = {
  items: MessageItem[],
}

export type MembersItem = {
  state: {
    identity: string,
    isTyping: boolean,
    sid: string,
    userInfo: string,
  }
}

export type ChannelDescriptor = {
  getChannel: () => Promise<ChannelItem>
}

export type ClientChannelResponse = {
  state: {
    items: Array<ChannelItem>
  }
}

export type TwilioClient = {
  getUserChannelDescriptors: () => Promise<ClientChannelResponse>,
  getPublicChannelDescriptors: () => Promise<ClientChannelResponse>,
  on: (key: string, action: () => void) => void,
  create: (token: string) => Promise<TwilioClient>,
}

export type ChannelApiResponse = {
  private: ClientChannelResponse,
  public: ClientChannelResponse,
};

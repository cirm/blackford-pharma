// @flow
export type channelItem = {
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
};

export type channelApiResponse = {
  private: {items : channelItem[]},
  public: {items: channelItem[]},
};

export type messageItem = {
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

export type messageApiResponse = {
  items: messageItem[],
}

export type membersItem = {
  state : {
    identity: string,
    isTyping: boolean,
    roleSid: string,
    sid: string,
    userInfo: string,
  }
}

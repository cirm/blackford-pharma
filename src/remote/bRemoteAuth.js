// @flow

export type UpdateTokenResponse = {
  renewable: boolean,
  apiToken?: string,
}

const checkRenewableTokens = (): UpdateTokenResponse => {
  const chatTokenKey: string = 'chatToken';
  const apiTokenKey: string = 'apiToken';

  const tempChatToken = localStorage.getItem(chatTokenKey);
  const tempApiToken = localStorage.getItem(apiTokenKey);
  if (!tempChatToken || !tempApiToken) {
    return { renewable: false };
  }
  const apiToken: string = JSON.parse(tempApiToken);
  return { renewable: true, apiToken };
};

export default checkRenewableTokens;

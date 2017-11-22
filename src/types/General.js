// @flow
export type tokens = {
  token: string,
  apiToken: string,
};

export type TokenApiResponse = {
  identity: string,
  id: number,
  roles: string[],
  token: string,
  apiToken: string,
};

export type DecodedTwilioToken = {
  exp: number,
  iat: number,
  iss: string,
  jti: string,
  sub: string,
  grants: {
    identity: string,
    chat: {
      service_sid: string,
      endpoint_id: string,
    }
  }
};

export type DecodedApiToken = {
  roles: string[],
  exp: number,
  iat: number,
  id: number,
  username: string,
}

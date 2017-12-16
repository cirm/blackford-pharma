// @flow
import type { AuthPayload, TokenApiResponse } from '../types/General';

const tokenApi: string = process.ENV === 'production' ? 'fixme' : 'http://localhost:4000';

export const postTokenApi = (payload: AuthPayload): Promise<TokenApiResponse> =>
  fetch(`${tokenApi}/token`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      Accept: 'application/json',
      'Content-Length': Object.keys(payload).length.toString(),
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());

export const putTokenApi = (payload: {apiToken: string}): Promise<TokenApiResponse> =>
  fetch(`${tokenApi}/token`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      Accept: 'application/json',
      'Content-Length': Object.keys(payload).length.toString(),
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());

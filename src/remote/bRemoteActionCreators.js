// @flow
import type { tokens as Tokens } from '../types/General';
import { LOGOUT, TCREATE_CHANNEL, TGET_CHANNELS, TCONNECT } from './bRemoteActionConstants';

export const logout = () => ({
  type: LOGOUT,
});

export const createChannel = (name: string) => ({
  type: TCREATE_CHANNEL,
  data: name,
  meta: { twilio: true },
});

export const getChannels = () => ({
  type: TGET_CHANNELS,
  meta: { twilio: true },
});

export const connectChat = (tokens: Tokens) => ({
  type: TCONNECT,
  data: tokens,
  meta: { twilio: true },
});

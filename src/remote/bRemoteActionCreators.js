// @flow
import type { tokens as Tokens } from '../types/General';
import { LOGOUT, TCREATE_CHANNEL, TGET_CHANNELS, TCONNECT } from './bRemoteActionConstants';

export const logout = () => ({
  type: LOGOUT,
});

export const getChannels = () => ({
  type: TGET_CHANNELS,
  meta: { twilio: true },
});
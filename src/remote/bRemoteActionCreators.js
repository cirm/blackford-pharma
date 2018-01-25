// @flow
import type { TwilioClient } from '../types/Twilio';
import { LOGOUT, TCONNECTED, TCONERROR, STOKENERROR } from './bRemoteActionConstants';

export const logout = () => ({
  type: LOGOUT,
});

export const clientConnected = (data: TwilioClient) => ({
  type: TCONNECTED,
  data,
});

export const twilioConError = (data: Error) => ({
  type: TCONERROR,
  data,
});

export const serverTokenError = (data: Error) => ({
  data,
  type: STOKENERROR,
});


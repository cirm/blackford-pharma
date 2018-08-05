// @flow
import {
  UPDATE_TOKENS,
} from './tokenConstants';
import type { TokenApiResponse } from '../types/General';

export const updateTokens = (data: TokenApiResponse) => ({
  type: UPDATE_TOKENS,
  data,
});

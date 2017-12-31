// @flow

import { putTokenApi } from '../bToken/bTokenApi';
import { updateTokens } from '../bToken/bTokenActionCreators';
import { connectChat } from './bRemoteActionCreators';
import type { ThunkAction, Dispatch } from '../types/Action';

const renewToken = (apiToken: string): ThunkAction => async (dispatch: Dispatch) => {
  let tokens;
  try {
    tokens = await putTokenApi({ apiToken });
  } catch (e) {
    console.log(e.toString());
  }
  if (!tokens) return;
  dispatch(updateTokens(tokens));
  dispatch(connectChat(tokens));
};

export default renewToken;

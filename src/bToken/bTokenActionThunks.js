import { push } from 'react-router-redux';
import { postTokenApi } from './bTokenApi';
import { updateTokens } from './bTokenActionCreators';

export const fetchAccessTokens = payload => async (dispatch) => {
  try {
    const tokens = await postTokenApi({ ...payload, device: 'browser' });
    dispatch(updateTokens(tokens));
    dispatch(push('/'));
  } catch (e) {
    console.log('ERROR 123123');
    console.log(e);
  }
};

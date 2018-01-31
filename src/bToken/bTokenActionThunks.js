import { push } from 'react-router-redux';
import { postTokenApi } from './bTokenApi';
import { updateTokens } from './bTokenActionCreators';
import { connectClient } from '../remote/bRemoteActionThunks';

const fetchAccessTokens = payload => async (dispatch) => {
  try {
    const tokens = await postTokenApi({ ...payload, device: 'browser' });
    if (!tokens.error) {
      dispatch(connectClient(tokens));
      dispatch(updateTokens(tokens));
      dispatch(push('/'));
    }
  } catch (e) {
    console.log('ERROR 123123');
    console.log(e);
  }
};

export default fetchAccessTokens;


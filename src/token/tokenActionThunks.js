import { push } from 'react-router-redux';
import { postTokenApi } from './tokenApi';
import { updateTokens } from './tokenActionCreators';
import { connectClient } from '../remote/remoteActionThunks';

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

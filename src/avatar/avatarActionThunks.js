import { getDeckerStats } from './avatarApi';

const renewAvatar = () => async (dispatch, getState) => {
  try {
    const state = await getState();
    const tokens = await getDeckerStats(state.token.apiToken);
    if (!tokens.error) {
      dispatch({ type: 'UPDATE_AVATAR', payload: tokens });
    }
  } catch (e) {
    console.log('AvataR ErroR 123123');
    console.log(e);
  }
};

export default renewAvatar;

import {
  getDeckerStats, getOrderList, getShopContent, postBuyProduct,
} from './avatarApi';
import { logout } from '../remote/remoteActionCreators';

export const renewAvatar = () => async (dispatch, getState) => {
  try {
    const state = await getState();
    const avatar = await getDeckerStats(state.token.apiToken);
    if (avatar.statusCode === 401 && avatar.error === 'Unauthorized') {
      return dispatch(logout());
    }
    if (!avatar.error) {
      dispatch({ type: 'UPDATE_AVATAR', data: avatar });
    }
  } catch (e) {
    console.log('AvataR ErroR 123123');
    console.log(e);
  }
};

export const renewShop = () => async (dispatch, getState) => {
  try {
    const state = await getState();
    const items = await getShopContent(state.token.apiToken);
    if (!items.error) {
      dispatch({ type: 'UPDATE_CART', data: items });
    }
  } catch (e) {
    console.log('CarT ErroR 123123');
    console.log(e);
  }
};

export const renewOrders = () => async (dispatch, getState) => {
  try {
    const state = await getState();
    const orders = await getOrderList(state.token.apiToken);
    if (!orders.error) {
      dispatch({ type: 'UPDATE_ORDERS', data: orders });
    }
  } catch (e) {
    console.log('CarT ErroR 123123');
    console.log(e);
  }
};

export const buyProduct = productId => async (dispatch, getState) => {
  try {
    const state = await getState();
    const result = await postBuyProduct(state.token.apiToken, productId);
    if (!result.error) {
      dispatch(renewAvatar()),
      dispatch(renewOrders()),
      dispatch(renewShop());
    }
  } catch (e) {
    console.log('Buying ErroR 123123');
    console.log(e);
  }
};

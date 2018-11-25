// @flow
import type { Action } from '../types';

const inittialState = {
  decker: {
    humanity: 'tbd', wallet: 'tbd', id: 'tbd', level: 'tbd', decker: 'tbd',
  },
  orders: [],
  shop: [],
};

const updateAvatar = (state, data) => ({
  ...state,
  shop: state.shop.map(item => ({ ...item, canBuy: item.price <= data.wallet })),
  decker: data,
});

const updateCart = (state, data) => ({
  ...state,
  shop: data.map(item => ({ ...item, canBuy: item.price <= state.decker.wallet })),
});

function avatarReducer(state = inittialState, action: Action) {
  switch (action.type) {
    case 'UPDATE_AVATAR':
      return updateAvatar(state, action.data);
    case 'UPDATE_CART':
      return updateCart(state, action.data);
    case 'UPDATE_ORDERS':
      return { ...state, orders: action.data };
    case 'HOT_RELOAD':
      return state;
    default:
      return state;
  }
}

export default avatarReducer;

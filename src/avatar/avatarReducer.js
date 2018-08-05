import type { Action } from '../types';

const inittialState = {
  humanity: 10, wallet: 37000, id: 8, level: 1, decker: '',
};

function avatarReducer(state = inittialState, action: Action) {
  switch (action.type) {
    case 'UPDATE_AVATAR':
      return { ...state, ...action.payload };
    case 'HOT_RELOAD':
      return state;
    default:
      return state;
  }
}

export default avatarReducer;

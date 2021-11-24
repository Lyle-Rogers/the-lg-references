import { AUTHENTICATE } from '../actions/Auth';

const initialState = {
  token: null,
  user: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        user: action.user
      }
    default:
      return state;
  }
}
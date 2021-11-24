import { AUTHENTICATE } from '../actions/auth';

const initalState = {
  isAuthenticated: false,
  subscriptionStatus: null,
  user: {}
}

export default(state = initalState, action) => {
  switch(action.type){
    case AUTHENTICATE:
      return {
        isAuthenticated: action.isAuthenticated,
        subscriptionStatus: action.subscriptionStatus,
        user: action.user
      }
    default:
      return state
  }
}
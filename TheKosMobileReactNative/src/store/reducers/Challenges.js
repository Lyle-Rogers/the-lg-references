import { CHALLENGES, SUBMITTED_CHALLENGES } from '../actions/Challenges';

const initialState = {
  challenges: null,
  submittedChallenges: null,
}

export default (state = initialState, action ) => {
  switch (action.type) {
    case CHALLENGES:
      return {
        ...state,
        challenges: action.challenges
      }
    case SUBMITTED_CHALLENGES:
      return {
        ...state,
        submittedChallenges: action.challenges
      }
    default:
      return state;
  }
}
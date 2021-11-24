import Axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(":").shift()}:8000/api/`;


export const CHALLENGES = "CHALLENGES";
export const SUBMITTED_CHALLENGES = "SUBMITTED_CHALLENGES";

export const handleChallenges = (challenges) => {
  return { type: CHALLENGES, challenges };
};

export const handleSubmitChallenges = (challenges) => {
  return { type: SUBMITTED_CHALLENGES, challenges }
}

export const getChallenges = (token) => {
  return async (dispatch) => {
    const response = await Axios.get(uri, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })

    const responseTwo = await Axios.get(uri + "submitted-challenges/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  
    const resData = await response.data.challenges
    const resDateTwo = await responseTwo.data
    dispatch(handleChallenges(resData))
    dispatch(handleSubmitChallenges(resDateTwo))
  }
}

export const submitChallengeEntry = (token, amount, challenge, hour, min, sec) => {
  return async (dispatch) => {
    const response = await Axios.post(uri, {
      amount: amount,
      challenge: challenge,
      time: {
        hours: hour,
        minutes: min,
        seconds: sec,
      },
    },
    {
      headers: {
        Authorization: `Token ${token}`,
      },    }
    );

    const resData = await response.data;
    if (resData.Success === true){
      dispatch(getChallenges(token))
    }
  };
};

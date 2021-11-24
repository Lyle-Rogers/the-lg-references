import Axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(":").shift()}:8000/api/`;


export const AUTHENTICATE = "AUTHENTICATE";

export const authenticate = (user, token) => {
  return { type: AUTHENTICATE, user, token };
};

export const login = (username, password) => {
  return async (dispatch) => {
    const response = await Axios.post(uri + "login/", {
      username: username,
      password: password,
    });

    const resData = await response.data.token;
    saveDataToStorage(resData);
    dispatch(getUser(resData));
  };
};

export const getUser = (token) => {
  return async (dispatch) => {
    const response = await Axios.get(uri + "get-user/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    const resData = await response.data.user;
    dispatch(authenticate(resData, token));
  };
};

export const createUser = (user) => {
  return async (dispatch) => {
    
    const response = await Axios.post(uri + "signup/", {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      password: user.password,
      password2: user.password2,
      age: this.state.date,
      height_ft: this.state.height_ft,
      height_in: this.state.height_in,
      gender: this.state.gender,
      weight: this.state.weight,
    });

    const resData = await response.data;
    if (resData.token) {
      saveDataToStorage(resData);
      dispatch(getUser(resData));
    }
  };
};

const saveDataToStorage = async (token) => {
  await AsyncStorage.setItem("userToken", token);
};

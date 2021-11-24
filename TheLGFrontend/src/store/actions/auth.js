import Axios from 'axios';

export const AUTHENTICATE = "AUTHENTICATE";

const uri = 'https://www.lebarongaleana-api.com/api/';

export const authenticate = (user, subscriptionStatus, isAuthenticated) => {
  return { type: AUTHENTICATE, user, subscriptionStatus, isAuthenticated };
};

export const autoLogin = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('userTokenLG')
    if(token){
      dispatch(getUser(token))
    }
  }
}

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

    const user = await response.data.user;
    const subscriptionStatus = await response.data.subscriptionStatus;

    dispatch(authenticate(user, subscriptionStatus, true));
  };
};

export const logout = () => {
  return async (dispatch) => {
    localStorage.removeItem('userTokenLG')
    dispatch(authenticate(null, null, false))
  }
}

export const createUser = (userData) => {
  return async (dispatch) => {
    const response = await Axios.post(uri + "signup/", {
      user: userData.user,
      profile: userData.profile
    });

    const resData = await response.data;
    if (resData) {
      saveDataToStorage(resData.token);
      dispatch(authenticate(resData.user, resData.subscriptionStatus, false))
    }
  };
};

const saveDataToStorage = (token) => {
  localStorage.setItem("userTokenLG", token);
};
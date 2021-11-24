import React, { useState } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import  AppLoading  from "expo-app-loading";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import Navigator from "./src/navigation/Navigation";
import authReducer from "./src/store/reducers/Auth";
import challengeReducer from './src/store/reducers/Challenges';
import * as Font from "expo-font";

const rootReducer = combineReducers({
  auth: authReducer,
  challenges: challengeReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "play": require("./assets/fonts/Play-Regular.ttf"),
    "play-bold": require("./assets/fonts/Play-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={null}
      />
    );
  }
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

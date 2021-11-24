import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import * as authActions from '../store/actions/Auth';


const StartUpScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () =>{
      const userToken = await AsyncStorage.getItem('userToken')
      if (!userToken){
        props.navigation.navigate('Auth')
        return;
      }
      
      try {
        dispatch(authActions.getUser(userToken))
        props.navigation.navigate('App')
      } catch(err){
        props.navigation.navigate('Auth')
        return;
      }
    }
    
    tryLogin();
  }, [dispatch])

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <ActivityIndicator size="large" color="#B00606" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
});

export default StartUpScreen;

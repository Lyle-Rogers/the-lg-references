import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  ActivityIndicator,
  Platform,
  SafeAreaView,
  ScrollView
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/Auth";

const LoginScreen = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const authHandler = async () => {
    let action;
    action = authActions.login(username, password);
    setIsLoading(true);

    try {
      await dispatch(action);
      props.navigation.navigate("App");
    } catch {
      setIsLoading(false);
      setError("Error: Invalid Credentials");
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.login}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require("../../assets/koslogorough-inverted-transparent.png")}
          />
        </View>
        <View style={styles.cardContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#B00606" />
          ) : (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.formTitle}>Login</Text>
              </View>
              <View style={styles.cardBody}>
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Username</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => setUsername(text)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <TextInput
                    secureTextEntry
                    style={styles.input}
                    onChangeText={(text) => setPassword(text)}
                  />
                </View>
                <TouchableOpacity style={styles.button} onPress={authHandler}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <View style={styles.signUpContainer}>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate("SignUp")}
                    style={styles.signUp}
                  >
                    <Text style={styles.signUpText}>No account? Sign up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0C0B10",
    paddingTop: Platform.OS === "ios" ? 70 : 0,
    paddingBottom: Platform.OS === "ios" ? 70 : 0,
    padding: 15,
  },
  login: {
    flex: 1,
  },
  imgContainer: {
    paddingTop: 15,
    width: "100%",
    height: "20%",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 80,
  },
  cardContainer: {
    height: 450,
    justifyContent: 'center',
  },
  card: {
    width: "100%",
    borderRadius: 10,
    padding: 15,
  },
  cardHeader: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
  },
  inputContainer: {
    backgroundColor: "#232228",
    borderRadius: 8,
    height: 65,
    width: "100%",
    justifyContent: "center",
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 18,
    width: "30%",
    height: 20,
    textAlign: "center",
    color: "#cdd0cb",
  },
  input: {
    height: 30,
    color: "#cdd0cb",
    borderBottomWidth: 1,
    borderColor: "#cdd0cb",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "red",
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
  },
  buttonText: {
    color: "#cdd0cb",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  signUpContainer: {
    alignItems: "center",
  },
  signUp: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: "#cdd0cb",
    width: "50%",
  },
  signUpText: {
    color: "#cdd0cb",
    textAlign: "center",
    marginBottom: 5,
  },
  error: {
    color: "red",
    margin: 5,
  },
});

export default LoginScreen;

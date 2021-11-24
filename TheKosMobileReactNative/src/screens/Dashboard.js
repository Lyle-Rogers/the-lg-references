import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  StatusBar,
  Image,
  Platform,
  Linking,
} from "react-native";
import { useSelector } from "react-redux";
import CheckIn from "../components/CheckIn";
import Challenges from "../components/Challenges";
import SubmittedChallenges from "../components/SubmitedChallenges";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import * as challengeActions from "../store/actions/Challenges";

const DashboardScreen = (props) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [token, setToken] = useState();

  const getDashboardData = async () => {
    const token = await AsyncStorage.getItem("userToken");
    setToken(token);
    try {
      await dispatch(challengeActions.getChallenges(token));
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      getDashboardData();
    }
  }, [user]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <View style={styles.dashboard}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Dashboard</Text>
        </View>
        {user.profile.registration ? (
          <ScrollView style={styles.body}>
            <View style={styles.bodyTitle}>
              <Text style={styles.bodyTitlePrimary}>Hello,</Text>
              <Text style={styles.bodyTitleSecondary}>
                {user.first_name} {user.last_name}
              </Text>
            </View>
            <View style={styles.checkIn}>
              <Text style={styles.sectionLabel}>Weekly Check-In:</Text>
              <CheckIn props={props} />
            </View>
            <View style={styles.challenges}>
              <Text style={styles.sectionLabel}>Challenges:</Text>
              <Challenges props={props} />
            </View>
            <View style={styles.challenges}>
              <Text style={styles.sectionLabel}>Submitted Challenges:</Text>
              <SubmittedChallenges props={props} />
            </View>
          </ScrollView>
        ) : (
            <View style={styles.needToRegister}>
              <Text style={{ color: White, fontSize: 20, marginBottom: 15 }}>
                You need to register for the KOS season to have access to this
                app. You can register on the website by clicking the button below.
                You will be required to sign in and then go to the profile tab
                where you can register for the new season. Thank you!
            </Text>
              <Button
                color={Red}
                title="Click Here To Register"
                onPress={() => {
                  Linking.openURL("https://www.kosfitnessclub.com/dashboard");
                }}
              />
            </View>
          )}
      </View>
    </View>
  );
};

const Black = "#0c0b10";
const Grey = "#151518";
const LightGrey = "#6d6d6d";
const Tan = "#a67960";
const Red = "#b00606";
const White = "#e4dfdd";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Black,
    paddingTop: Platform.OS === "ios" ? 70 : 0,
    paddingBottom: Platform.OS === "ios" ? 70 : 0,
    padding: 15,
  },
  dashboard: {
    flex: 1,
  },
  bodyTitle: {
    marginBottom: 20,
  },
  bodyTitlePrimary: {
    color: "#e4dfdd",
    fontSize: 30,
    fontWeight: "600",
  },
  bodyTitleSecondary: {
    color: "#e4dfdd",
    fontSize: 30,
    fontWeight: "600",
  },
  headerTitle: {
    color: "#e4dfdd",
    fontSize: 24,
    fontWeight: "400",
    textAlign: "right",
  },
  checkIn: {
    marginBottom: 15,
  },
  sectionLabel: {
    color: White,
    fontSize: 18,
    fontWeight: "200",
  },
  needToRegister: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DashboardScreen;

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Platform
} from "react-native";
import TimeSelector from "../components/TimeSelector";
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useDispatch } from "react-redux";
import * as challengeActions from "../store/actions/Challenges";
import { Ionicons } from "@expo/vector-icons";

const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(":").shift()}:8000/api/`;

const ChallengeScreen = (props) => {
  const dispatch = useDispatch();
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [amount, setAmount] = useState(null);
  const challenge = props.navigation.state.params.challenge;
  const review = props.navigation.state.params.review;
  const [error, setError] = useState();

  const handleSubmit = async () => {
    if (hour === 0 && min === 0 && sec === 0 && !amount) {
      setError("Entry can't be none.");
      return;
    }
    setError();
    const token = await AsyncStorage.getItem("userToken");

    try {
      await dispatch(
        challengeActions.submitChallengeEntry(
          token,
          amount,
          challenge.id,
          hour,
          min,
          sec
        )
      );
      props.navigation.navigate("Dashboard");
    } catch {
      setError("Error: Problem Submitting.");
    }
  };

  const handleTime = (hour, min, sec) => {
    setHour(parseInt(hour)), setMin(parseInt(min));
    setSec(parseInt(sec));
  };

  const handleForm = () => {
    if (challenge.response === "Time") {
      return <TimeSelector handleTime={handleTime} />;
    } else {
      return (
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Enter Amount</Text>
          <TextInput
            value={amount}
            onChangeText={(e) => setAmount(e)}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
      );
    }
  };

  if (review) {
    return (
      <View style={styles.screen}>
        <StatusBar barStyle="light-content" />
        <View style={styles.challenge}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.return}
              onPress={() => props.navigation.navigate("Dashboard")}
            >
              <Ionicons name="return-down-back-sharp" size={32} color={White} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{challenge.title}</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.summary}>{challenge.title}</Text>
            <View style={styles.reviewContainer}>
              <Text style={styles.reviewValue}>{challenge.value}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.screen}>
        <StatusBar barStyle="light-content" />
        <View style={styles.challenge}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.return}
              onPress={() => props.navigation.navigate("Dashboard")}
            >
              <Ionicons name="return-down-back-sharp" size={32} color={White} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{challenge.title}</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.error}>{error}</Text>
            <Text style={styles.summary}>{challenge.summary}</Text>
            {handleForm()}
            <TouchableOpacity onPress={handleSubmit}>
              <View style={styles.submitContainer}>
                <Text style={styles.submitButtonText}>Submit Challenge</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
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
    backgroundColor: "#0C0B10",
    paddingTop: Platform.OS === "ios" ? 70 : 0,
    paddingBottom: 70,
    padding: 15,
  },
  challenge: {
    marginBottom: 25,
  },
  header: {
    marginBottom: 35,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  return: {},
  returnText: {
    color: White,
    fontSize: 20,
  },
  headerTitle: {
    color: "#e4dfdd",
    fontSize: 30,
    fontWeight: "400",
  },
  summary: {
    color: White,
    fontSize: 18,
  },
  submitContainer: {
    marginTop: 15,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: Red,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    color: White,
    fontSize: 22,
  },
  error: {
    color: Red,
    fontSize: 18,
    textAlign: "center",
  },
  inputContainer: {
    backgroundColor: "#232228",
    borderRadius: 8,
    height: 65,
    width: "100%",
    justifyContent: "center",
    marginBottom: 15,
    marginTop: 15,
  },
  inputLabel: {
    fontSize: 18,
    height: 20,
    marginLeft: 10,
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
  reviewContainer: {
    backgroundColor: "#232228",
    borderRadius: 8,
    height: 65,
    width: "100%",
    justifyContent: "center",
    marginBottom: 15,
    marginTop: 15,
  },
  reviewValue: {
    fontSize: 18,
    height: 20,
    marginLeft: 10,
    color: "#cdd0cb",
  }
});

export default ChallengeScreen;

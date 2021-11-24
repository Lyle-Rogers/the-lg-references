import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Select from "../components/Select";
import CustomImagePicker from "../components/ImagePicker";
import moment from "moment";
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import CameraComponent from "../components/Camera";

const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(":").shift()}:8000/api/checkIn/`;

const CheckInFormScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState();
  const [dateObj, setDateObj] = useState();
  const [imageLoading, setImageLoading] = useState(false);
  const [showHoursPicker, setShowHoursPicker] = useState(false);
  const [hours, setHours] = useState({ label: "0", value: 0 });
  const [showMinPicker, setShowMinPicker] = useState(false);
  const [min, setMin] = useState({ label: "0", value: 0 });
  const [showWorkoutPicker, setShowWorkoutPicker] = useState(false);
  const [workout, setWorkout] = useState();
  const [image, setImage] = useState();
  const [error, setError] = useState();

  const handleSubmit = async () => {
    setError();

    if (hours.value === 0 && min.value === 0) {
      setError("Duration of Workout Cannot Be 0");
      return;
    }
    if (!workout) {
      setError("Workout Cannot Be Blank");
      return;
    }
    if (!image) {
      setError("Image Required");
      return;
    }

    setIsLoading(true);
    const token = await AsyncStorage.getItem("userToken");

    Axios.post(
      uri,
      {
        device: "Mobile",
        imgData: image,
        date: moment(date).format("YYYY-MM-DD"),
        workoutDuration: hours.value + ":" + min.value,
        workoutType: workout.value,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    ).then(() => {
      props.navigation.state.params.handleUpdate();
      props.navigation.navigate('Dashboard')
    });
  };

  useEffect(() => {
    try {
      setDate(props.navigation.state.params.date);
    } catch {}
    try {
      setDateObj(props.navigation.state.params.dateObj);
    } catch {}
  }, []);


  if (dateObj) {
    return (
      <View style={styles.screen}>
        <StatusBar barStyle="light-content" />
        <View style={styles.checkInForm}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.return}
              onPress={() => props.navigation.navigate("Dashboard")}
            >
              <Ionicons name="return-down-back-sharp" size={32} color={White} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{date}</Text>
          </View>
          <View style={styles.body}>
            <View style={styles.activityContainer}>
              <View style={styles.activity}>
                <Text style={styles.content}>{dateObj.workoutLength}</Text>
                <View style={styles.seperator}></View>
                <Text style={styles.label}>Workout Duration</Text>
              </View>
              <View style={styles.activity}>
                <Text style={styles.content}>{dateObj.workoutType}</Text>
                <View style={styles.seperator}></View>
                <Text style={styles.label}>Workout Activity</Text>
              </View>
            </View>
            <View style={styles.imgContainer}>
              <Image
                style={styles.img}
                resizeMode="contain"
                onLoadStart={() => {
                  setImageLoading(true);
                }}
                onLoadEnd={() => {
                  setImageLoading(false);
                }}
                source={{
                  uri: dateObj.picture,
                }}
              />
              {imageLoading ? (
                <ActivityIndicator
                  style={{ position: "absolute" }}
                  size="large"
                  color="#B00606"
                />
              ) : null}
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.screen}>
        <StatusBar barStyle="light-content" />
        <ScrollView style={styles.checkInForm}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.return}
              onPress={() => props.navigation.navigate("Dashboard")}
            >
              <Ionicons name="return-down-back-sharp" size={32} color={White} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{date}</Text>
          </View>
          {isLoading ? (
            <View style={styles.bodyLoading}>
              <ActivityIndicator size="large" color="#B00606" />
            </View>
          ) : (
            <View style={styles.body}>
              {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
              <View>
                <Text style={styles.containerTitle}>Duration of Workout</Text>
                <View style={styles.durationInputs}>
                  <TouchableWithoutFeedback
                    onPress={() => setShowHoursPicker(true)}
                  >
                    <View
                      style={[styles.inputContainer, styles.inputContainerTwo]}
                    >
                      <Text style={styles.inputLabel}>Hours</Text>
                      <View style={styles.falseInput}>
                        <Text style={styles.falseInputText}>
                          {hours ? hours.label : null}
                        </Text>
                      </View>

                      <Select
                        showModal={showHoursPicker}
                        closeModal={() => setShowHoursPicker(false)}
                        handleValue={(value) => setHours(value)}
                        options={[
                          { label: "0", value: 0 },
                          { label: "1", value: 1 },
                          { label: "2", value: 2 },
                          { label: "3", value: 3 },
                          { label: "4", value: 4 },
                          { label: "5", value: 5 },
                        ]}
                        title={"Hours"}
                      />
                    </View>
                  </TouchableWithoutFeedback>

                  <TouchableWithoutFeedback
                    onPress={() => setShowMinPicker(true)}
                  >
                    <View
                      style={[styles.inputContainer, styles.inputContainerTwo]}
                    >
                      <Text style={styles.inputLabel}>Minutes</Text>
                      <View style={styles.falseInput}>
                        <Text style={styles.falseInputText}>
                          {min ? min.label : null}
                        </Text>
                      </View>
                      <Select
                        showModal={showMinPicker}
                        closeModal={() => setShowMinPicker(false)}
                        handleValue={(value) => setMin(value)}
                        options={[
                          { label: "0", value: 0 },
                          { label: "5", value: 5 },
                          { label: "10", value: 10 },
                          { label: "15", value: 15 },
                          { label: "20", value: 20 },
                          { label: "25", value: 25 },
                          { label: "30", value: 30 },
                          { label: "35", value: 35 },
                          { label: "40", value: 40 },
                          { label: "45", value: 45 },
                          { label: "50", value: 50 },
                          { label: "55", value: 55 },
                        ]}
                        title={"Minutes"}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.seperator}></View>
              </View>
              <View>
                <Text style={styles.containerTitle}>Type of Workout</Text>
                <View style={styles.typesInput}>
                  <TouchableWithoutFeedback
                    onPress={() => setShowWorkoutPicker(true)}
                  >
                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>Workout</Text>
                      <View style={styles.falseInput}>
                        <Text style={styles.falseInputText}>
                          {workout ? workout.label : null}
                        </Text>
                      </View>

                      <Select
                        showModal={showWorkoutPicker}
                        closeModal={() => setShowWorkoutPicker(false)}
                        handleValue={(value) => setWorkout(value)}
                        options={[
                          { label: "Weights", value: "WEIGHTS" },
                          { label: "Cardio", value: "CARDIO" },
                          { label: "Swimming", value: "SWIMING" },
                          { label: "Running", value: "RUNNING" },
                          { label: "Cycling", value: "CYCLING" },
                          { label: "Sports", value: "SPORTS" },
                          { label: "Soccer", value: "SOCCER" },
                          { label: "Volleyball", value: "VOLLEYBALL" },
                          { label: "Golf", value: "GOLF" },
                          { label: "Hunting", value: "HUNTING" },
                          { label: "Hiking", value: "HIKING" },
                          { label: "HIIT", value: "HIIT" },
                          { label: "Calisthenics", value: "CALISTHENICS" },
                          { label: "Yoga", value: "YOGA" },
                          { label: "Crossfit", value: "CROSSFIT" },
                        ]}
                        title={"Workout"}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.seperator}></View>
              </View>
              <View>
                <Text style={styles.containerTitle}>Image</Text>
                <View style={styles.imgUploadContainer}>
                  {/* <CustomImagePicker handleImage={(image) => setImage(image)} /> */}
                  <CameraComponent handleImage={(image) => setImage(image)} />
                </View>
              </View>
              <TouchableOpacity onPress={handleSubmit}>
                <View style={styles.submitContainer}>
                  <Text style={styles.submitButtonText}>Submit Check In</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
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
  checkInForm: {
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
  bodyLoading: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 600
  },
  activityContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  activity: {
    width: "48%",
    backgroundColor: Grey,
    padding: 15,
    borderWidth: 0.5,
    borderColor: White,
    borderRadius: 5,
  },
  label: {
    color: White,
    fontSize: 20,
    fontWeight: "200",
    textAlign: "center",
  },
  seperator: {
    marginTop: 5,
    marginBottom: 5,
    borderColor: White,
    borderWidth: 0.5,
  },
  content: {
    color: White,
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
  },
  imgContainer: {
    marginTop: 15,
    borderWidth: 0.5,
    borderColor: White,
    borderRadius: 5,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "100%",
    height: Dimensions.get('window').width - 30,
  },
  durationInputs: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  containerTitle: {
    textAlign: "center",
    color: White,
    fontSize: 24,
    fontWeight: "200",
    marginBottom: 10,
  },
  inputContainerTwo: {
    width: "48%",
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
    fontWeight: "200",
    height: 20,
    marginLeft: 10,
    color: White,
  },
  input: {
    height: 30,
    color: White,
    borderBottomWidth: 1,
    borderColor: White,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  falseInput: {
    height: 30,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    justifyContent: "center",
  },
  falseInputText: {
    color: White,
    fontSize: 18,
  },
  imgUploadContainer: {
    justifyContent: "center",
    alignItems: "center",
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
  errorMessage: {
    fontSize: 20,
    textAlign: "center",
    color: Red,
  },
});

export default CheckInFormScreen;

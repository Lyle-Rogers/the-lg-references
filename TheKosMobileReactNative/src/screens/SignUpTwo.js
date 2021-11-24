import moment from "moment";
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import DatePicker from "../components/DatePicker";
import Select from "../components/Select";
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost
  .split(":")
  .shift()}:8000/api/signup/`;

class SignUpTwoScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      showPicker: false,
      showPicker_1: false,
      showPicker_2: false,
      headerHeight: 0,
      date: null,
      genderOptions: [
        { label: "Male", value: "M" },
        { label: "Female", value: "F" },
        { label: "Other", value: "O" },
      ],
      gender: null,
      height_ft: null,
      height_in: null,
      heightOptions_ft: [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
        { label: "8", value: 8 },
      ],
      heightOptions_in: [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
        { label: "8", value: 8 },
        { label: "9", value: 9 },
        { label: "10", value: 10 },
        { label: "11", value: 11 },
      ],
      weight: null,
      isLoading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { date, gender, height_ft, height_in, weight } = this.state;

    if (!date || !gender || !height_ft || !height_in || !weight) {
      console.log("Error: Missing Information");
    } else {
      this.setState({ isLoading: true });

      const user = this.props.navigation.state.params.user.user;

      Axios.post(uri, {
        device: "mobile",
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        password: user.password,
        password2: user.password2,
        age: moment(this.state.date).format("YYYY-MM-DD"),
        height_ft: this.state.height_ft.value,
        height_in: this.state.height_in.value,
        gender: this.state.gender.value,
        weight: this.state.weight,
      }).then((res) => {
        var token = res.data.token;
        AsyncStorage.setItem("userToken", token);
        this.props.navigation.navigate("StartUp");
      });
    }
  }

  handleChange(value, name) {
    this.setState({ user: { ...this.state.user, [name]: value } });
  }

  render() {
    return (
      <View style={styles.screen}>
        <StatusBar barStyle="light-content" />
        <KeyboardAvoidingView
          keyboardVerticalOffset={0}
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={styles.page}
        >
          <ScrollView>
            <View style={styles.imgContainer}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={require("../../assets/koslogorough-inverted-transparent.png")}
              />
            </View>
            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.formTitle}>Profile Information</Text>
                </View>

                {this.state.isLoading ? (
                  <ActivityIndicator size="large" color="#B00606" />
                ) : (
                  <View style={styles.cardBody}>
                    {/* Start Date Picker */}
                    <TouchableWithoutFeedback
                      onPress={() => this.setState({ showModal: true })}
                    >
                      <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Birthday</Text>
                        <View style={styles.falseInput}>
                          <Text style={styles.falseInputText}>
                            {this.state.date
                              ? moment(this.state.date).format("MMMM/DD/YYYY")
                              : null}
                          </Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                    <DatePicker
                      showModal={this.state.showModal}
                      closeModal={() => this.setState({ showModal: false })}
                      handleDate={(date) => this.setState({ date })}
                    />
                    {/* End Date Picker */}

                    {/* Start Option Selector */}
                    <TouchableWithoutFeedback
                      onPress={() => this.setState({ showPicker: true })}
                    >
                      <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Gender</Text>
                        <View style={styles.falseInput}>
                          <Text style={styles.falseInputText}>
                            {this.state.gender ? this.state.gender.label : null}
                          </Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>

                    <Select
                      showModal={this.state.showPicker}
                      closeModal={() => this.setState({ showPicker: false })}
                      handleValue={(value) => this.setState({ gender: value })}
                      options={this.state.genderOptions}
                    />
                    {/* End Option Selector */}

                    {/* Start Height(ft) Selectors */}
                    <TouchableWithoutFeedback
                      onPress={() => this.setState({ showPicker_1: true })}
                    >
                      <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Height(ft)</Text>
                        <View style={styles.falseInput}>
                          <Text style={styles.falseInputText}>
                            {this.state.height_ft
                              ? this.state.height_ft.label
                              : null}
                          </Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>

                    <Select
                      showModal={this.state.showPicker_1}
                      closeModal={() => this.setState({ showPicker_1: false })}
                      handleValue={(value) =>
                        this.setState({ height_ft: value })
                      }
                      options={this.state.heightOptions_ft}
                      title={"Height in feet?"}
                    />
                    {/* End Height(ft) Selectors */}

                    {/* Start Height(in) Selectors */}

                    <TouchableWithoutFeedback
                      onPress={() => this.setState({ showPicker_2: true })}
                    >
                      <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Height(in)</Text>
                        <View style={styles.falseInput}>
                          <Text style={styles.falseInputText}>
                            {this.state.height_in
                              ? this.state.height_in.label
                              : null}
                          </Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>

                    <Select
                      showModal={this.state.showPicker_2}
                      closeModal={() => this.setState({ showPicker_2: false })}
                      handleValue={(value) =>
                        this.setState({ height_in: value })
                      }
                      options={this.state.heightOptions_in}
                      title={"Height in inches?"}
                    />
                    {/* End Height(in) Selectors */}

                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>Weight</Text>
                      <TextInput
                        value={this.state.weight ? this.state.weight : null}
                        keyboardType="numeric"
                        onChangeText={(number) =>
                          this.setState({ weight: number })
                        }
                        style={styles.input}
                      />
                    </View>

                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleSubmit()}
                    >
                      <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                    <View style={styles.signUpContainer}>
                      <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("Login")}
                        style={styles.signUp}
                      >
                        <Text style={styles.signUpText}>
                          Have an account? Login
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0C0B10",
    paddingTop: Platform.OS === "ios" ? 70 : 0,
    padding: 15,
  },
  page: {
    flex: 1,
  },
  imgContainer: {
    width: "100%",
  },
  image: {
    width: "100%",
    height: 80,
  },
  cardContainer: {
    flex: 1,
    marginTop: 15,
  },
  card: {
    width: "100%",
    height: "80%",
    // backgroundColor: "#232228",
    borderRadius: 10,
    padding: 15,
  },
  cardHeader: {
    width: "100%",
    height: "10%",
    alignItems: "center",
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
  falseInput: {
    height: 30,
    borderBottomWidth: 1,
    borderColor: "#cdd0cb",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    justifyContent: "center",
  },
  falseInputText: {
    color: "#cdd0cb",
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
  datePicker: {
    backgroundColor: "white",
  },
});

export default SignUpTwoScreen;

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView 
} from "react-native";

class SignUpScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_2: "",
      },
      headerHeight: 0,
      error: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(value, name) {
    this.setState({ user: { ...this.state.user, [name]: value } });
  }

  handleSubmit() {
    const {
      username,
      first_name,
      last_name,
      email,
      password,
      password_2,
    } = this.state.user;

    if (password != password_2) {
      this.setState({ error: "Error: Passwords don't match!" });
      return;
    }

    if (password === "") {
      this.setState({ error: "Error: Password cannot be blank!" });
      return;
    }

    if (
      username === "" ||
      first_name === "" ||
      last_name === "" ||
      email === ""
    ) {
      this.setState({
        error: "Missing Information: All fields must be filled in!",
      });
      return;
    }

    this.props.navigation.navigate("SignUpTwo", { user: this.state });
  }

  render() {
    return (
      <View style={styles.screen}>
        <StatusBar barStyle="light-content" />
        <KeyboardAvoidingView
          keyboardVerticalOffset={0}
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : null }
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
                  <Text style={styles.formTitle}>Sign Up</Text>
                </View>
                {this.state.error ? (
                  <View style={styles.formErrors}>
                    <Text style={styles.formErrorText}>{this.state.error}</Text>
                  </View>
                ) : null}

                <View style={styles.cardBody}>
                  {/* <FloatingInput label="Username" /> */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Username</Text>
                    <TextInput
                      value={this.state.username}
                      onChangeText={(e) => this.handleChange(e, "username")}
                      style={styles.input}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>First Name</Text>
                    <TextInput
                      value={this.state.first_name}
                      onChangeText={(e) => this.handleChange(e, "first_name")}
                      style={styles.input}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Last Name</Text>
                    <TextInput
                      value={this.state.last_name}
                      onChangeText={(e) => this.handleChange(e, "last_name")}
                      style={styles.input}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                      value={this.state.email}
                      onChangeText={(e) => this.handleChange(e, "email")}
                      style={styles.input}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput
                      secureTextEntry
                      value={this.state.password}
                      onChangeText={(e) => this.handleChange(e, "password")}
                      style={styles.input}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Confirm Password</Text>
                    <TextInput
                      secureTextEntry
                      value={this.state.password_2}
                      onChangeText={(e) => this.handleChange(e, "password_2")}
                      style={styles.input}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => this.handleSubmit()}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Sign Up</Text>
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
  imgContainer: {
    width: "100%",
  },
  image: {
    width: "100%",
    height: 80,
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
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
  formErrors: {
    margin: 10,
  },
  formErrorText: {
    color: "red",
    textAlign: "center",
  },
});

export default SignUpScreen;

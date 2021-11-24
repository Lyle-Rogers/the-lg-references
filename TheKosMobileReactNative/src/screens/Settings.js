import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SettingsScreen = (props) => {
  const Logout = () => {
    AsyncStorage.removeItem("userToken");
    props.navigation.navigate("Auth");
  };

  const alertNotAvailable = () => {
    Alert.alert(
      "Ooops",
      "This is available yet but we are working hard to get it to as soon as possible!",
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.settings}>
        <View style={styles.settingsHeader}>
          <Ionicons name="ios-settings" size={46} color={White} />
          <Text style={styles.settingsHeaderTitle}>Settings</Text>
        </View>
        <View style={styles.settingsBody}>
          <TouchableOpacity onPress={alertNotAvailable}>
            <View style={styles.settingButton}>
              <View style={styles.buttonTextContainer}>
                <Ionicons name="ios-person" size={34} color={LightGrey} />
                <Text style={styles.settingButtonTitle}>Profile</Text>
              </View>
              <Ionicons name="ios-arrow-forward" size={34} color={LightGrey} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity  onPress={alertNotAvailable}>
            <View style={styles.settingButton}>
              <View style={styles.buttonTextContainer}>
                <Ionicons name="ios-star" size={34} color={LightGrey} />
                <Text style={styles.settingButtonTitle}>Registration</Text>
              </View>
              <Ionicons name="ios-arrow-forward" size={34} color={LightGrey} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => props.navigation.navigate('Rules')}>
            <View style={styles.settingButton}>
              <View style={styles.buttonTextContainer}>
                <Ionicons name="ios-book" size={34} color={LightGrey} />
                <Text style={styles.settingButtonTitle}>Offical Rules</Text>
              </View>
              <Ionicons name="ios-arrow-forward" size={34} color={LightGrey} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={Logout}>
            <View style={styles.settingButton}>
              <View style={styles.buttonTextContainer}>
                <Ionicons name="ios-log-out" size={34} color={LightGrey} />
                <Text style={styles.settingButtonTitle}>Logout</Text>
              </View>
              <Ionicons name="ios-arrow-forward" size={34} color={LightGrey} />
            </View>
          </TouchableOpacity>
        </View>
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
    paddingTop: 70,
    paddingBottom: 70,
    padding: 15,
  },
  settingsHeader: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    borderBottomWidth: 1,
    borderColor: LightGrey,
  },
  settingsHeaderTitle: {
    fontSize: 32,
    fontWeight: "600",
    color: White,
    marginLeft: 12,
  },
  settingsBody: {
    marginTop: 20,
    padding: 20,
  },
  settingButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Grey,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonTextContainer: {
    flexDirection: 'row'
  },
  settingButtonTitle: {
    marginLeft: 15,
    color: LightGrey,
    fontSize: 28,
  },
});

export default SettingsScreen;

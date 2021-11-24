import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect } from "react";

const TimeSelector = (props) => {
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  const handleTime = () => {
    props.handleTime(hour, min, sec);
  };

  const handleChange = (value, name) => {
    if (name === "hour") {
      setHour(value);
    } else if (name === "min") {
      setMin(value);
    } else if (name === "sec") {
      setSec(value);
    }
  };

  const handleTimePicker = (type) => {
    if (type === "hours") {
      let i = 0;
      let pickers = [];
      while (i < 23) {
        i++;
        pickers.push(<Picker.Item label={`${i} HR`} value={`${i}`} />);
      }
      return pickers;
    } else if (type === "min") {
      let i = 0;
      let pickers = [];
      while (i < 59) {
        i++;
        pickers.push(<Picker.Item label={`${i} Min`} value={`${i}`} />);
      }
      return pickers;
    } else if (type === "sec") {
      let i = 0;
      let pickers = [];
      while (i < 59) {
        i++;
        pickers.push(<Picker.Item label={`${i} Sec`} value={`${i}`} />);
      }
      return pickers;
    }
  };

  useEffect(() => {
    handleTime();
  }, [hour, min, sec]);

  return (
    <View>
      <View style={styles.timeContainer}>
        <Picker
          selectedValue={hour}
          style={
            Platform.OS === "ios"
              ? styles.hourSelector
              : styles.hourSelectorAndroid
          }
          itemStyle={{ height: 125, color: "white", fontSize: 20 }}
          color="white"
          onValueChange={(itemValue) => handleChange(itemValue, "hour")}
        >
          <Picker.Item label="0 HR" value="0" style={{ color: "white" }} />
          {handleTimePicker("hours")}
        </Picker>
        <Picker
          selectedValue={min}
          style={
            Platform.OS === "ios"
              ? styles.hourSelector
              : styles.hourSelectorAndroid
          }
          itemStyle={{ height: 125, color: "white", fontSize: 20 }}
          onValueChange={(itemValue) => handleChange(itemValue, "min")}
        >
          <Picker.Item label="0 Min" value="0" />

          {handleTimePicker("min")}
        </Picker>
        <Picker
          selectedValue={sec}
          style={
            Platform.OS === "ios"
              ? styles.hourSelector
              : styles.hourSelectorAndroid
          }
          itemStyle={{ height: 125, color: "white", fontSize: 20 }}
          onValueChange={(itemValue) => handleChange(itemValue, "sec")}
        >
          <Picker.Item label="0 Sec" value="0" />

          {handleTimePicker("sec")}
        </Picker>
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
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 35,
    width: "100%",
    height: "40%",
    // alignItems: "center",
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 22,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  showButton: {
    backgroundColor: Grey,
    borderRadius: 8,
    height: 65,
    width: "100%",
    justifyContent: "center",
    marginBottom: 15,
  },
  showButtonText: {
    color: White,
  },
  inputWrapper: {
    margin: 15,
  },
  inputContainer: {
    backgroundColor: Grey,
    borderRadius: 8,
    height: 65,
    width: "100%",
  },
  inputLabel: {
    fontSize: 18,
    height: 20,
    marginLeft: 10,
    color: White,
  },
  input: {
    height: 30,
    borderBottomWidth: 1,
    borderColor: White,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    justifyContent: "center",
  },
  inputText: {
    color: White,
  },
  timeContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  hourSelector: {
    width: "30%",
    height: 125,
    backgroundColor: Red,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  hourSelectorAndroid: {
    width: "32%",
    height: 125,
    backgroundColor: White,
  },
});

export default TimeSelector;

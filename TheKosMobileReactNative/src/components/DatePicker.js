import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableHighlight,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePicker = (props) => {
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    if (Platform.OS === "android") {
      props.closeModal();
      const currentDate = selectedDate || date;
      setDate(currentDate);
      props.handleDate(currentDate);
    } else {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      props.handleDate(currentDate);
    }
  };

  if (Platform.OS === "ios") {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={props.showModal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Text>Date Picker</Text>
                <TouchableHighlight
                  style={styles.closeButton}
                  onPress={() => {
                    props.closeModal(), props.handleDate(date);
                  }}
                >
                  <Text style={styles.buttonText}>X</Text>
                </TouchableHighlight>
              </View>

              <DateTimePicker
                value={date}
                mode="date"
                display="spinner"
                onChange={onChange}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  } else {
    return (
      <View style={styles.centeredView}>
        {props.showModal ? (
          <DateTimePicker
            value={date}
            mode="date"
            display="spinner"
            onChange={onChange}
          />
        ) : null}
      </View>
    );
  }
};

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
    height: "50%",
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
});

export default DatePicker;

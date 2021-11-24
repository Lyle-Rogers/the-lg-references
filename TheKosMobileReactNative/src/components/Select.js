import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const Select = (props) => {
  const [selectedValue, setSelectedValue] = useState(props.options[0]);

  const handleOptions = () => {
    return props.options.map((option) => {
      return (
        <Picker.Item key={option.value} label={option.label} value={option} />
      );
    });
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.showModal}
        onRequestClose={() => {
          props.closeModal();
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text>{props.title ? props.title : "Select Option"}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  props.closeModal();
                  props.handleValue(selectedValue);
                }}
              >
                <Text style={styles.buttonText}>Enter</Text>
              </TouchableOpacity>
            </View>

            <Picker
              selectedValue={selectedValue}
              style={{ width: "100%" }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(props.options[itemIndex])
              }
            >
              {handleOptions()}
            </Picker>
          </View>
        </View>
      </Modal>
    </View>
  );
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
    height: "40%",
    // alignItems: "center",
  },
  closeButton: {
    width: 100,
    height: 40,
    backgroundColor: 'black',
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
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
export default Select;

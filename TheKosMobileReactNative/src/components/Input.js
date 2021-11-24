import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';

const FloatingInput = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState("");

  const handleTextChange = (e) => {
    setValue(e.target.value);

    if (e.target.value !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }

    props.handleInput(e.target.name, e.target.value);
  };

  return (
    <View style={styles.inputContainer} >
      <Text style={styles.label}>{props.label}</Text>
      <TextInput style={styles.input} />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer:{},
  label:{},
  input: {}
})

export default FloatingInput
import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const CustomImagePicker = (props) => {
  // const [image, setImage] = useState(null);


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [5,9],
      quality: 1,
    });


    if (!result.cancelled) {
      // setImage(result.uri);
      props.handleImage(result)
    }

  };

  return (
    <View style={styles.imgUploadContainer}>
      {/* {image ? (
        <View style={styles.imgWrapper}>
          <Image source={{ uri: image }} style={{ width: 299, height: 299 }} />
          <TouchableOpacity
              style={styles.removeButton}
              onPress={() => setImage()}
            >
              <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
        </View>
      ) : ( */}
        <TouchableOpacity onPress={pickImage}>
          <FontAwesome name="upload" size={40} color={White} />
        </TouchableOpacity>
       {/* )} */}
    </View>
  );
};

const Grey = "#151518";
const White = "#e4dfdd";

const styles = StyleSheet.create({
  imgUploadContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
  },
  removeButton: {
    margin: 10,
    position: "absolute",
    backgroundColor: Grey,
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  removeButtonText: {
    fontSize: 20,
    color: White
  }
});

export default CustomImagePicker;

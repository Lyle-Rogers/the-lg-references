import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  Platform,
  Dimensions,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import CustomImagePicker from "./ImagePicker";

const CameraComponent = (props) => {
  const [show, setShow] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const focus = Camera.Constants.AutoFocus.on;
  const [image, setImage] = useState(null);
  const [camera, setCamera] = useState(null);

  const uploadPhoto = (image) => {
    setShow(false);
    setImage(image.uri);
    props.handleImage(image.base64);
  };

  const snapPhoto = async () => {
    if (camera) {
      const options = {
        quality: 1,
        base64: true,
        fixOrientation: true,
        exif: true,
      };
      await camera.takePictureAsync(options).then((photo) => {
        photo.exif.Orentation = 1;
        setImage(photo.uri);
        props.handleImage(photo.base64);
        setShow(false);
      });
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (show) {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={show}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
        style={{ backgroundColor: Black }}
      >
        <View style={styles.cameraContainer}>
          <View style={styles.cameraHeader}>
            <TouchableOpacity
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Ionicons name="camera-reverse-sharp" size={40} color={White} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShow(false);
              }}
            >
              <Text style={styles.closeCamera}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cameraBody}>
            <Camera
              style={styles.camera}
              type={type}
              autoFocus={focus}
              ref={(ref) => setCamera(ref)}
            />
          </View>
          <View style={styles.cameraFooter}>
            <View style={styles.cameraFooterLeft}>
              <CustomImagePicker handleImage={(image) => uploadPhoto(image)} />
            </View>
            <View style={styles.cameraFooterCenter}>
              <TouchableOpacity
                style={styles.cameraCapture}
                onPress={snapPhoto}
              >
                <View style={styles.cameraCaptureInner}></View>
              </TouchableOpacity>
            </View>
            <View style={styles.cameraFooterRight}></View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View style={styles.imgUploadContainer}>
      {image ? (
        <View style={styles.imgWrapper}>
          <Image source={{ uri: image }} style={{ width: 299, height: 299 }} resizeMode="contain" />
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => setImage()}
          >
            <Text style={styles.removeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={() => setShow(true)}>
          <FontAwesome name="camera" size={60} color={White} />
        </TouchableOpacity>
      )}
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
  imgUploadContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 300,
    width: 300,
    borderWidth: 0.5,
    borderColor: White,
    backgroundColor: Grey,
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
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    fontSize: 20,
    color: White,
  },
  cameraContainer: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 30 : 0,
    paddingBottom: Platform.OS === "ios" ? 50 : 0,
    backgroundColor: Black,
  },
  cameraBody: {
    height: "75%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: "100%",
    height: Dimensions.get("window").width,
  },
  cameraHeader: {
    minHeight: 50,
    height: "10%",
    paddingRight: 15,
    paddingLeft: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeCamera: {
    color: White,
    fontSize: 40,
  },
  cameraFooter: {
    height: "15%",
    flexDirection: "row",
    width: "100%",
    paddingBottom: 10
  },
  cameraFooterLeft: {
    height: "100%",
    width: "20%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cameraFooterRight: {
    height: "100%",
    width: "20%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cameraFooterCenter: {
    height: "100%",
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraCapture: {
    height: 75,
    width: 75,
    backgroundColor: White,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraCaptureInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Black,
  },
});

export default CameraComponent;

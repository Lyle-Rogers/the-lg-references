import React, {useEffect, useState} from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  ScrollView, TextInput
} from "react-native";
import Axios from "axios";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Select from "../components/Select";
import { sub } from "react-native-reanimated";

const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(":").shift()}:8000/api/`;

const CheckIn = (props) => {
  const [dates, setDates] = useState([]);
  const [checkedDates, setCheckedDates] = useState([]);
  const [dateObjs, setDateObjs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [showPicker, setShowPicker] = useState(false);
  const [showPickerTwo, setShowPickerTwo] = useState(false);
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const user = useSelector((state) => state.auth.user);

  const handleDates = () => {
    let cutoffDate = moment().subtract(3, "days").format("MM/DD/YYYY");
    let today = moment().format("MM/DD/YYYY");

    const handleUpdate = () => {
      getWeek();
    };

    return dates.map((date) => {
      if (checkedDates.includes(moment(date).format("YYYY-MM-DD"))) {
        const submittedDate = dateObjs.find((obj) => {
          if (obj.date === moment(date).format("YYYY-MM-DD")) {
            return obj;
          }
        });

        // if this date already has been checked in, return a checked in box to show date details
        return (
          <TouchableOpacity
            onPress={() =>
              props.props.navigation.navigate("CheckIn", {
                date: date,
                dateObj: submittedDate,
              })
            }
            key={date}
          >
            <View style={[styles.checkIn, styles.checkInComplete]}>
              <Text style={[styles.checkInDate, styles.checkInDateComplete]}>
                {moment(date).format("ddd")}
              </Text>
              <Text
                style={[
                  styles.checkInDateSecondary,
                  styles.checkInDateComplete,
                ]}
              >
                {moment(date).format("DD")}
              </Text>
            </View>
          </TouchableOpacity>
        );
      } else if (
        moment(date).format("MM/DD/YYYY") < cutoffDate ||
        moment(date).format("MM/DD/YYYY") > today
      ) {
        // if this date is is in the future or past the cut off date, return a locked box
        return (
          <TouchableOpacity key={date}>
            <View style={styles.checkIn}>
              <Text style={[styles.checkInDate, styles.checkInLocked]}>
                {moment(date).format("ddd")}
              </Text>
              <Text style={[styles.checkInDateSecondary, styles.checkInLocked]}>
                {moment(date).format("DD")}
              </Text>
            </View>
          </TouchableOpacity>
        );
      } else if (moment(date).format("DD") == moment().format("DD")) {
        // if this date is today, apply today className
        return (
          <TouchableOpacity
            key={date}
            onPress={() =>
              props.props.navigation.navigate("CheckIn", {
                date: date,
                handleUpdate: handleUpdate,
              })
            }
          >
            <View style={[styles.checkIn, styles.checkInToday]}>
              <Text style={[styles.checkInDate, styles.today]}>
                {moment(date).format("ddd")}
              </Text>
              <Text style={[styles.checkInDateSecondary, styles.today]}>
                {moment(date).format("DD")}
              </Text>
            </View>
          </TouchableOpacity>
        );
      } else {
        // return a regular date/box
        return (
          <View>
            <TouchableOpacity
              key={date}
              onPress={() =>
                props.props.navigation.navigate("CheckIn", {
                  date: date,
                  handleUpdate: handleUpdate,
                })
              }
            >
              <View style={styles.checkIn}>
                <Text style={styles.checkInDate}>
                  {moment(date).format("ddd")}
                </Text>
                <Text style={styles.checkInDateSecondary}>
                  {moment(date).format("DD")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      }
    });
  };

  const getWeek = async () => {
    var dates = [];

    let today = moment().day(+2);
    let to_date = moment(today).endOf("week");
    let from_date = moment(today).startOf("week");

    let times_ran = 0;

    while (from_date.format("DDDD") <= to_date.format("DDDD")) {
      times_ran += 1;

      if (times_ran > 10) {
        break;
      }
      dates.push(from_date.format("MM/DD/YYYY"));
      from_date = from_date.add(1, "day");
    }

    setDates(dates);

    const token = await AsyncStorage.getItem("userToken");

    Axios.get(uri + "checkIn/", {
      params: {
        dateOne: moment(dates[0]).format("YYYY-MM-DD"),
        dateTwo: moment(dates[6]).format("YYYY-MM-DD"),
      },
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => {
        let checkedDates = [];
        let dateObj = [];
        response.data.checkIn.map((obj) => {
          checkedDates.push(obj.date), dateObj.push(obj);
        });

        setCheckedDates(checkedDates);
        setDateObjs(dateObj);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (user) {
      getWeek();
    }
  }, [user]);


  if (!dates) {
    return <View></View>;
  }

  return (
    <View style={styles.page}>
      <ScrollView horizontal style={styles.checkInContainer}>
        {handleDates()}
      </ScrollView>
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
  page: {},
  checkInContainer: {
    // flexDirection: "row",
    // justifyContent: "space-evenly",
  },
  checkIn: {
    width: 100,
    height: 100,
    backgroundColor: Grey,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  checkInLocked: {
    color: LightGrey,
  },
  // checkInComplete: {
  //   backgroundColor: White,
  // },
  checkInToday: {
    backgroundColor: Red,
  },
  checkInDate: {
    color: White,
    fontSize: 30,
    marginBottom: 5,
    fontWeight: "200",
  },
  checkInDateSecondary: {
    color: White,
    fontSize: 30,
    fontWeight: "600",
  },
  today: {
    color: White,
  },
  checkInDateComplete: {
    color: Red,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: White,
    borderRadius: 5,
    padding: 15,
    width: "95%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingBottom: 5,
    borderBottomWidth: 1,
  },
  closeModal: {
    backgroundColor: Grey,
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    borderRadius: 50,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  modalBody: {
    marginTop: 10,
  },
  sectionBody: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  sectionHeader: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "300",
  },
  inputDuration: {
    width: "49%",
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
});

export default CheckIn;

import { Ionicons, FontAwesome } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  View,
  StatusBar,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import Axios from "axios";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(":").shift()}:8000/api/`;

const ActivityScreen = () => {
  const [checkIns, setCheckIns] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [weeklyCount, setWeeklyCount] = useState(0);
  const [startOfMonth, setStartOfMonth] = useState(
    moment().clone().startOf("month").format("YYYY-MM-DD")
  );
  const [endOfMonth, setEndOfMonth] = useState(
    moment().clone().endOf("month").format("YYYY-MM-DD")
  );

  const getNewMonth = async (direction) => {
    let startOfNewMonth = null;
    let endOfNewMonth = null;

    if (direction === "Back") {
      startOfNewMonth = moment(startOfMonth)
        .startOf("month")
        .subtract(1, "M")
        .format("YYYY-MM-DD");
      endOfNewMonth = moment(endOfMonth)
        .endOf("month")
        .subtract(1, "M")
        .format("YYYY-MM-DD");
    } else if (direction === "Forward") {
      startOfNewMonth = moment(startOfMonth)
        .startOf("month")
        .add(1, "M")
        .format("YYYY-MM-DD");
      endOfNewMonth = moment(endOfMonth)
        .endOf("month")
        .add(1, "M")
        .format("YYYY-MM-DD");
    }
    setStartOfMonth(startOfNewMonth);
    setEndOfMonth(endOfNewMonth);
    getCheckIns(startOfNewMonth, endOfNewMonth);
  };

  const handleCheckIns = () => {
    if (checkIns) {
      return checkIns.map((checkIn) => {
        return (
          <View style={styles.checkIn} key={checkIn.id}>
            <Text style={styles.checkInText}>
              {moment(checkIn.date).format("MM/DD/YYYY")}
            </Text>
            <Text style={styles.checkInText}>{checkIn.workoutType}</Text>
            <Text style={styles.checkInText}>{checkIn.workoutLength}</Text>
          </View>
        );
      });
    }
  };

  const handleWeekly = (data) => {
    let week = [];

    const today = moment().format("YYYY-MM-DD");
    const from_date = moment().startOf("week").add(1, "d").format("YYYY-MM-DD");
    const to_date = moment().endOf("week").add(1, "d").format("YYYY-MM-DD");

    for (const key in data) {
      var obj = data[key];

      if (obj.date >= from_date && obj.date <= to_date) {
        week.push(obj);
      }
    }

    setWeeklyCount(week.length);
  };

  const getCheckIns = async (start, end) => {
    const token = await AsyncStorage.getItem("userToken");
    if (start && end) {
      Axios.get(uri + "checkIn/", {
        params: {
          dateOne: start,
          dateTwo: end,
          order: "newest",
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => {
          setCheckIns(response.data.checkIn);
          setTotalCount(response.data.totalCount);
          handleWeekly(response.data.checkIn);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Axios.get(uri + "checkIn/", {
        params: {
          dateOne: startOfMonth,
          dateTwo: endOfMonth,
          order: "newest",
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => {
          setCheckIns(response.data.checkIn);
          setTotalCount(response.data.totalCount);
          handleWeekly(response.data.checkIn);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getCheckIns();
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.activity}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Check-In Activity</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.badges}>
            <View style={styles.badge}>
              <View style={styles.badgeImageContainer}>
                {weeklyCount >= 5 ? (
                  <FontAwesome name="certificate" size={70} color={Red} />
                ) : (
                  <FontAwesome name="certificate" size={70} color={LightGrey} />
                )}
              </View>
              <View style={styles.badgeTextContainer}>
                <View style={styles.badgeTextPrimaryContainer}>
                  <Text style={styles.badgeTextPrimary}>
                    5x Check-In's/Week
                  </Text>
                </View>
                <View style={styles.badgeTextSecondaryContainer}>
                  <Text style={styles.badgeTextSecondary}>
                    {weeklyCount} Visits/Week
                  </Text>
                  <Text style={styles.badgeTextSecondary}>{weeklyCount}/5</Text>
                </View>
              </View>
            </View>
            <View style={styles.badge}>
              <View style={styles.badgeImageContainer}>
                {checkIns.length >= 20 ? (
                  <FontAwesome name="certificate" size={70} color={Red} />
                ) : (
                  <FontAwesome name="certificate" size={70} color={LightGrey} />
                )}
              </View>
              <View style={styles.badgeTextContainer}>
                <View style={styles.badgeTextPrimaryContainer}>
                  <Text style={styles.badgeTextPrimary}>
                    20x Check-In's/Month
                  </Text>
                </View>
                <View style={styles.badgeTextSecondaryContainer}>
                  <Text style={styles.badgeTextSecondary}>
                    {checkIns.length <= 20 ? checkIns.length : 20} Visits/Month
                  </Text>
                  <Text style={styles.badgeTextSecondary}>
                    {checkIns.length <= 20 ? checkIns.length : 20}/20
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.badge}>
              <View style={styles.badgeImageContainer}>
                {checkIns.length >= 100 ? (
                  <FontAwesome name="certificate" size={70} color={Red} />
                ) : (
                  <FontAwesome name="certificate" size={70} color={LightGrey} />
                )}
              </View>
              <View style={styles.badgeTextContainer}>
                <View style={styles.badgeTextPrimaryContainer}>
                  <Text style={styles.badgeTextPrimary}>
                    100x Check-In's/Season
                  </Text>
                </View>
                <View style={styles.badgeTextSecondaryContainer}>
                  <Text style={styles.badgeTextSecondary}>
                    {totalCount} Visits/Season
                  </Text>
                  <Text style={styles.badgeTextSecondary}>
                    {totalCount}/100
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.break}></View>
          <View style={styles.checkIns}>
            <View style={styles.selector}>
              <TouchableOpacity onPress={() => getNewMonth("Back")}>
                <Ionicons name="ios-chevron-back" size={34} color={White} />
              </TouchableOpacity>
              <Text style={styles.selectorText}>
                {moment(startOfMonth).format("MMMM")}
              </Text>
              <TouchableOpacity onPress={() => getNewMonth("Forward")}>
                <Ionicons name="ios-chevron-forward" size={34} color={White} />
              </TouchableOpacity>
            </View>
            <View style={styles.monthContainer}>
              <Text style={styles.monthTextTitle}>Monthly Total</Text>
              <Text style={styles.monthText}>{checkIns.length}</Text>
            </View>
            <View>{handleCheckIns()}</View>
          </View>
        </View>
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
  screen: {
    flex: 1,
    backgroundColor: Black,
    paddingTop: Platform.OS === "ios" ? 70 : 0,
    paddingBottom: Platform.OS === "ios" ? 70 : 0,
    padding: 15,
  },
  activity: {
    flex: 1,
    marginBottom: 15,
  },
  header: {
    marginBottom: 25,
  },
  headerTitle: {
    color: "#e4dfdd",
    fontSize: 24,
    fontWeight: "400",
    textAlign: "right",
  },
  badge: {
    backgroundColor: Grey,
    width: "100%",
    height: 80,
    flexDirection: "row",
    marginBottom: 15,
    borderRadius: 7,
  },
  badgeImageContainer: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeImage: {
    height: 70,
    width: 70,
    borderRadius: 40,
  },
  badgeTextContainer: {
    width: "75%",
  },
  badgeTextSecondaryContainer: {
    height: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
  },
  badgeTextPrimaryContainer: {
    height: "50%",
    justifyContent: "center",
  },
  badgeTextPrimary: {
    color: White,
    fontSize: 20,
  },
  badgeTextSecondary: {
    color: White,
  },
  break: {
    borderWidth: 0.5,
    borderColor: White,
  },
  checkIns: {
    paddingTop: 20,
    padding: 10,
  },
  monthContainer: {
    width: "50%",
  },
  monthTextTitle: {
    fontSize: 24,
    color: White,
    fontWeight: "300",
  },
  monthText: {
    fontSize: 24,
    color: White,
    fontWeight: "500",
  },
  checkIn: {
    borderBottomWidth: 0.5,
    backgroundColor: Grey,
    height: 50,
    borderColor: White,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
  },
  checkInText: {
    fontSize: 20,
    color: White,
  },
  selector: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  selectorText: {
    fontSize: 28,
    color: White,
  },
});

export default ActivityScreen;

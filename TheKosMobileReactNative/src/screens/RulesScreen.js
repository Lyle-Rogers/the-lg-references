import React from "react";
import { StyleSheet, View, Text, StatusBar, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const RulesScreen = () => {
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <View style={styles.dashboard}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Offical Rules Of KOS</Text>
        </View>
        <ScrollView style={styles.body}>
          <Text style={styles.text}>
            This group is about fitness. Only fitness material is to be posted,
            anything else will get you removed.
          </Text>
          <Text style={styles.text}>
            Any advertising of any sort must be approved by myself or Bradley
            before posting. You will get removed for doing otherwise; This is
            not Amazon.
          </Text>
          <Text style={styles.text}>
            Everyone must participate in the monthly challenges. If you are hurt
            or injured, please let me know ahead of time. If the challenge is
            too hard, you can scale it to your level. Whomever does not
            participate, will be removed.
          </Text>
          <Text style={styles.text}>
            If you miss more than 10 days total over the period of the
            challenge, you will be removed and disqualified from the overall
            prizes; even if you get sick it won’t
            matter, this is a competition.
          </Text>
          <Text style={styles.text}>
            You can only get credit for 5 days in a week; You are not allowed to
            work out 6 or 7 days the following week to make up for missed days.
          </Text>

          <Text style={styles.text}>
            Any information on this group cannot be shared without permission.
            Doing so will get you disqualified and removed.
          </Text>
          <Text style={styles.text}>
            Work will not count as a workout. Active sports will count as a
            workout such as: basketball, volleyball, baseball, etc. Hiking will
            count. Fishing will not count. You are allowed 1 round of golf per
            week to count as a workout. Running through the airport will not
            count. Use good judgement, don’t make me have to tell you what a
            workout is.
          </Text>
          <Text style={styles.text}>
            Know your limitations do the challenges at your own risk.
          </Text>

          <Text style={styles.textOffical}>APPLE, INC. (“APPLE”) IS NOT A SPONSOR OF KOS, NOR DO THEY ENDORSE THIS SERVICE OR SPONSOR ANY PRIZE REDEMPTIONS..</Text>
        </ScrollView>
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
    paddingTop: Platform.OS === "ios" ? 70 : 0,
    paddingBottom: Platform.OS === "ios" ? 70 : 0,
    padding: 15,
  },
  dashboard: {
    flex: 1,
  },
  headerTitle: {
    color: "#e4dfdd",
    fontSize: 24,
    fontWeight: "400",
    textAlign: "right",
    marginBottom: 20,
  },
  text: {
    color: "#e4dfdd",
    fontSize: 22,
    fontWeight: "400",
    marginBottom: 20,
  },
  textOffical: {
    color: "#e4dfdd",
    fontSize: 18,
    fontWeight: "200",
    marginBottom: 20,
  },
});

export default RulesScreen;

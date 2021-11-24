import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const SubmittedChallenges = (props) => {
  const challenges = useSelector((state) => state.challenges.submittedChallenges)

  const handleChallenges = () => {
    return challenges.map((challenge) => {
      return (
        <TouchableOpacity
          key={challenge.id}
          onPress={() =>
            props.props.navigation.navigate("Challenge", {
              challenge: challenge,
              review: true,
            })
          }
        >
          <View style={styles.challenge}>
            <Text style={styles.challengeTitle}>{challenge.title}</Text>
            <Ionicons name="chevron-down-sharp" size={24} color={White} />
          </View>
        </TouchableOpacity>
      );
    });
  };

  if(!challenges){
    return <View></View>
  }
  
  return <ScrollView style={styles.page}>{handleChallenges()}</ScrollView>;
};

const Black = "#0c0b10";
const Grey = "#151518";
const LightGrey = "#6d6d6d";
const Tan = "#a67960";
const Red = "#b00606";
const White = "#e4dfdd";

const styles = StyleSheet.create({
  page: {
    marginTop: 5,
    height: 210,
  },
  challenge: {
    backgroundColor: Grey,
    height: 60,
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
  },
  challengeTitle: {
    color: White,
    fontSize: 20,
  },
});

export default SubmittedChallenges;

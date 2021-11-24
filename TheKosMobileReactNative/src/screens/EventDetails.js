import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe";

const EventDetailsScreen = (props) => {
  const event = props.navigation.state.params.event;
  const [buffer, setBuffer] = useState(false);
  const [error, setError] = useState(false);
  const [playing, setPlaying] = useState(false);

  const handleCards = () => {
    if (event.cards) {
      return event.cards.map((card) => {
        return (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardContent}>{card.content}</Text>
          </View>
        );
      });
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.eventDetails}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Events')}>
            <Ionicons name="return-down-back-sharp" size={24} color={White} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{event.title}</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.textContent}>
            <Text style={styles.postedOn}>{event.postedOn}</Text>
            <Text style={styles.summary}>{event.content}</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.cardContainer}
          >
            {handleCards()}
          </ScrollView>
          <View style={styles.videoContainer}>
            <YoutubePlayer
              height={300}
              play={playing}
              videoId={event.videoLink}
            />
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
    paddingBottom: 70,
    padding: 15,
  },
  header: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#e4dfdd",
    fontSize: 24,
    fontWeight: "400",
    textAlign: "right",
  },
  body: {},
  textContent: {
    width: "100%",
  },
  summary: {
    color: White,
    fontSize: 20,
    textAlign: "center",
  },
  postedOn: {
    color: White,
    fontSize: 16,
    textAlign: "right",
    marginBottom: 10,
  },
  cardContainer: {
    marginTop: 15,
    flexDirection: "row",
  },
  card: {
    width: 250,
    backgroundColor: White,
    marginRight: 10,
    padding: 10,
    // justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 25,
  },
  cardContent: {
    fontSize: 17,
  },
  videoContainer: {
    marginTop: 15,
  },
});

export default EventDetailsScreen;

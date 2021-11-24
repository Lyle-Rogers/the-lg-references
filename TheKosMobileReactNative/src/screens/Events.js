import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Events = [
  {
    id: 9,
    postedOn: "1/22/2021",
    title: "KOS 5 0 full Video",
    videoLink: "weugOcmu9L0",
    content:
      "",
    cards: [

    ],
  },

  {
    id: 8,
    postedOn: "10/15/2020",
    title: "October Challenges",
    videoLink: "6v6IsZcvqCA",
    content:
      "Here are you challenges for the month of October. This is all due by November 7th.",
    cards: [
      {
        id: 5,
        title: "Most Weight Lost",
        content:
          "$100 per each category, not mandatory. Need your weight by today if you haven't already turned it in over the weekend.",
      },
      {
        id: 6,
        title: "5 rep max back squat + muscle ups",
        content:
          "Every muscle up will equal 10lbs. Example: 200lbs squat + 15 muscle ups = 350. This is mandatory.",
      },
    ],
  },
  {
    id: 7,
    postedOn: "09/25/2020",
    title: "KOS Week 6 & 7",
    videoLink: "YsPoUtvaM0A",
    content:
      "Here is some inspiration for all of you. Keep up the good work, athletes.",
  },
  {
    id: 6,
    postedOn: "09/14/2020",
    title: "September Challenges",
    videoLink: "6jBY2BqaBSk",
    content: "Here's all the challenges for this month. Good luck athletes.",
    cards: [
      {
        id: 4,
        title: "Most weight lost",
        content:
          "Need your weights turned in by the end of today if you haven't posted it over the weekend already.",
      },
      {
        id: 5,
        title: "5 rep max flat bench + max stricter pull ups",
        content:
          "This is mandatory. You can do this challenge anytime before 10/3. If you win this challenge, you must have a video of your workout. Every pull up will equal 10 lbs. Example: Bench 200 lbs + 15 pull ups = Total Score of 350.",
      },
      {
        id: 6,
        title: "Personal Challenge",
        content:
          "Give up “one” thing in your diet that’s holding you back from achieving your fitness goals. Post only one thing with your selfie workout if you’re in a Group selfie post them on the group selfie on side of each person name when you work out each day post on the side of your workout the days you have gone without the item you’re giving up .",
      },
    ],
  },
  {
    id: 5,
    postedOn: "08/31/2020",
    title: "KOS Week 2 & 3",
    videoLink: "5rm5zxSX3Gk",
    content:
      "If you haven't completed your workouts this week, get it done. Here's some motivation.",
  },
  {
    id: 4,
    title: "KOS Week 1 Video",
    postedOn: "08/17/2020",
    videoLink: "EfVGB1wE12M",
  },
  {
    id: 3,
    title: "August Challenges",
    postedOn: "08/04/2020",
    videoLink: "oGa4KLqWFc8",
    cards: [
      {
        id: 1,
        title: "Most Weight Loss",
        content:
          "Ends September 5th. $100 USD per each caterogry. This is not mandatory. You need to turn in your weight by August 10th if you haven't already.",
      },
      {
        id: 2,
        title: "Quickest 100 burpies.",
        content:
          "You must post the video if you win / want to qualify. You can do this challenge anytime before September 5th. This challenge is mandatory. You will be removed if you don't attempt the challenge. If you are injured or unable to do it for any other reason, please contact us in advance.",
      },
      {
        id: 3,
        title: "Personal Challenge",
        content:
          "Give up 'one' thing in your diet that is holding you hack from achieving your fitness goals. Please let us know how long you've gone without the thing everyday when you turn in your workout selfie.",
      },
    ],
  },

  {
    id: 2,
    title: "how to do a burpie",
    postedOn: "08/04/2020",
    videoLink: "dZgVxmf6jkA",
  },
];

const EventsScreen = (props) => {
  const handleEvents = () => {
    return Events.map((event) => {
      return (
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("EventDetails", {
              event: event,
            })
          }
          key={event.id}
          style={styles.eventCard}
        >
          <View>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventDate}>{event.postedOn}</Text>
          </View>
          <Ionicons name="chevron-forward-sharp" size={24} color={White} />
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.events}>
        <View style={styles.eventsHeader}>
          <Text style={styles.eventsHeaderTitle}>Events</Text>
        </View>
        <View style={styles.eventsBody}>{handleEvents()}</View>
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
    paddingBottom: 70,
    padding: 15,
  },
  events: {
    flex: 1,
  },
  eventCard: {
    backgroundColor: Grey,
    height: 60,
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    borderRadius: 3,
  },
  eventsHeader: {
    width: "100%",
    height: 50,
    alignItems: "flex-end",
  },
  eventsHeaderTitle: {
    color: "#e4dfdd",
    fontSize: 24,
    fontWeight: "400",
    textAlign: "right",
  },
  eventTitle: {
    color: White,
    fontSize: 20,
    fontWeight: "600",
  },
  eventDate: {
    color: White,
    fontSize: 18,
    fontWeight: "300",
  },
});

export default EventsScreen;

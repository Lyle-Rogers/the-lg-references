import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { BottomTabBar, createBottomTabNavigator } from "react-navigation-tabs";
import DashboardScreen from "../screens/Dashboard";
import EventsScreen from "../screens/Events";
import LoginScreen from "../screens/Login";
import SignUpScreen from "../screens/SignUp";
import SignUpTwoScreen from "../screens/SignUpTwo";
import StartUpScreen from "../screens/StartUpScreen";
import { Ionicons } from "@expo/vector-icons";
import SettingsScreen from "../screens/Settings";
import CheckInFormScreen from "../screens/CheckInForm";
import ChallengeScreen from "../screens/ChallengeScreen";
import EventDetailsScreen from "../screens/EventDetails";
import RulesScreen from "../screens/RulesScreen";
import ActivityScreen from "../screens/ActivityScreen";

// COLOR SCHEME
const Black = "#0c0b10";
const Grey = "#151518";
const Tan = "#a67960";
const Red = "#b00606";
const White = "#e4dfdd";

const defaultNavigationOptions = {
  headerShown: false,
};

const SettingsStackNavigator = createStackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: defaultNavigationOptions,
  },
  Rules: {
    screen: RulesScreen,
    navigationOptions: defaultNavigationOptions,
  },
});

const EventsStackNavigator = createStackNavigator({
  Events: {
    screen: EventsScreen,
    navigationOptions: defaultNavigationOptions,
  },
  EventDetails: {
    screen: EventDetailsScreen,
    navigationOptions: defaultNavigationOptions,
  },
});

const DashboardStackNavigator = createStackNavigator({
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: defaultNavigationOptions,
  },
  CheckIn: {
    screen: CheckInFormScreen,
    navigationOptions: defaultNavigationOptions,
  },
  Challenge: {
    screen: ChallengeScreen,
    navigationOptions: defaultNavigationOptions,
  },
});

const AppTabNavigator = createBottomTabNavigator(
  {
    Dashboard: {
      screen: DashboardStackNavigator,
      navigationOptions: {
        tabBarLabel: "Dashboard",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-home" size={23} color={tintColor} />
        ),
      },
    },
    Events: {
      screen: EventsStackNavigator,
      navigationOptions: {
        tabBarLabel: "Events",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-calendar" size={24} color={tintColor} />
        ),
      },
    },
    Activity: {
      screen: ActivityScreen,
      navigationOptions: {
        tabBarLabel: "Activity",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-cellular" size={24} color={tintColor} />
        ),
      },
    },
    Logout: {
      screen: SettingsStackNavigator,
      navigationOptions: {
        tabBarLabel: "Settings",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-settings" size={24} color={tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      showIcon: true,
      inactiveTintColor: White,
      activeTintColor: Red,
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: Grey,
        position: "absolute",
        bottom: 0,
        padding: 10,
        zIndex: 8,
        borderTopColor: "transparent",
      },
    },
  }
);

const AuthStackNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: defaultNavigationOptions,
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: defaultNavigationOptions,
  },
  SignUpTwo: {
    screen: SignUpTwoScreen,
    navigationOptions: defaultNavigationOptions,
  },
});

const MainNavigator = createSwitchNavigator({
  StartUp: {
    screen: StartUpScreen,
    navigationOptions: {
      headerTintColor: "#333333",
    },
  },
  App: AppTabNavigator,
  Auth: AuthStackNavigator,
});

export default createAppContainer(MainNavigator);

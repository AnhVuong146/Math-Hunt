import React from "react";
//import { View, Text, StyleSheet, Modal, Button, Platform, TouchableOpacity } from "react-native";
//import Game from "./src/components/Game";
import HomeScreen from "./src/components/HomeScreen";
//import GameScreen from "./src/components/GameScreen";
import AppNavigator from "./AppNavigator";
import app from './firebaseConfig';

export default function App() {
  return <AppNavigator />;
}

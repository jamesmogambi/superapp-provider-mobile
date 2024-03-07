import { View, Text } from "react-native";
import React from "react";
import HomeStack from "./HomeStack";
import AuthStack from "./AuthStack";

// TODO:ADD AUTHENTICATION LOGIC HERE
const RootStack = () => {
  return <AuthStack />;
};

export default RootStack;

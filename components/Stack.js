import { View, Text } from "react-native";
import React from "react";

const Stack = ({ children }) => {
  return <View className="bg-white flex-1">{children}</View>;
};

export default Stack;

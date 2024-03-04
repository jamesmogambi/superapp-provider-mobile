import { View, Text, ScrollView } from "react-native";
import React from "react";
import HomeTabs from "../navigation/HomeTabs";

const Home = () => {
  return (
    <View className="flex-1  border-green-500">
      <HomeTabs />
    </View>
  );
};

export default Home;

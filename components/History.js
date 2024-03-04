import { View, Text, FlatList } from "react-native";
import React from "react";
import { Divider } from "react-native-paper";
import HistoryItem from "./HistoryItem";
import { orders } from "../fixtures/order";

const History = () => {
  return (
    <FlatList
      data={orders}
      renderItem={({ item, index }) => (
        <View className="p-4">
          <HistoryItem item={item} />
        </View>
      )}
      keyExtractor={(item, index) => item + index}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={<Divider />}
    />
  );
};

export default History;

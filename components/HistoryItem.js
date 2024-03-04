import { View, Text, Pressable } from "react-native";
import React from "react";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { green600 } from "../constants/colors";
import StatusBadge from "./StatusBadge";

const HistoryItem = ({ item }) => {
  const { status, orderId, deliveryTime, order } = item;
  return (
    <Pressable className="space-y-3">
      <View className="flex-row justify-between">
        <Text className="font-semibold">Order ID : #{orderId}</Text>
        <StatusBadge status={status} />
      </View>

      <View className="flex-row justify-between">
        <Text className="italic">30 Nov 2023 02:55</Text>
        <Text className="text-green-600 font-semibold">Ksh 1500</Text>
      </View>
      <View className="flex-row items-center space-x-3">
        <MaterialCommunityIcons name="hand-coin" size={20} color={green600} />
        <View className="flex-row space-x-2">
          {order.map((i, k) => (
            <View key={k} className="flex-row items-center space-x-1">
              <Text>
                {i.name} {k !== order.length - 1 && ","}
              </Text>
              {/* <Feather name="x" size={15} color="black" />
              <Text>{i.quantity}</Text> */}
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
};

export default HistoryItem;

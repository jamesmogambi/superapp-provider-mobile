import { View, Text } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { green600 } from "../constants/colors";

const WalletBalance = () => {
  return (
    <View className="flex-row space-x-5 items-center   rounded-2xl  bg-green-50 border-[0.5px] border-green-600 px-4 py-6">
      <View className="rounded-full p-3 justify-center items-center border-[0.5px] border-green-500 ">
        <MaterialCommunityIcons name="wallet" size={36} color={green600} />
      </View>
      <View>
        <Text>Current Balance</Text>
        <Text className="text-2xl font-semibold ">Ksh 1500.00</Text>
      </View>
    </View>
  );
};

export default WalletBalance;

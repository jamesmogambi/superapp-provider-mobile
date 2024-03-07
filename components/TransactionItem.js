import { View, Text } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const TransactionItem = ({ transaction }) => {
  const { id, service, type, amount, date } = transaction;

  return (
    <View className="flex-row justify-between items-center  p-4 ">
      <View className="flex-row items-center  space-x-4 flex-shrink flex-1">
        <View>
          {type === "credit" ? (
            <View className=" rounded-full border-[1.5px] border-green-500">
              <Feather name="arrow-up-right" size={22} color="#16a34a" />
            </View>
          ) : (
            <View className="rounded-full border-[1.5px] border-red-500">
              <Feather name="arrow-down-left" size={22} color="#ef4444" />
            </View>
          )}
        </View>
        <View className="flex-1 space-y-2">
          <Text className="text-[16px] font-medium">{service}</Text>
          <Text
            numberOfLines={1}
            className="text-[12px] font-light text-neutral-500"
          >
            {date}
          </Text>
        </View>
      </View>

      <View className="ml-4">
        <Text
          className={`${
            type === "credit" ? "text-green-600" : "text-red-500"
          } text-[16px] font-semibold`}
        >
          Ksh {amount}
        </Text>
      </View>
    </View>
  );
};

export default TransactionItem;

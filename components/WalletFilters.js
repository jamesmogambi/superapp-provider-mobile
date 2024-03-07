import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const options = [
  {
    value: "All",
  },
  {
    value: "Credit",
  },
  {
    value: "Debit",
  },
];

const WalletFilters = () => {
  const [active, setActive] = useState("All");
  const navigation = useNavigation();

  const handlePress = (param) => {
    setActive(param);

    // do other task eg querying backened
  };

  const handleAll = (param) => {
    setActive(param);
    navigation.navigate("Transactions");
  };
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row gap-2">
        {options.map((i, k) => (
          <Pressable
            key={k}
            onPress={() => handlePress(i.value)}
            className={`${
              active === i.value
                ? "bg-green-50 border-green-500"
                : "bg-transparent border-black"
            }  border-[0.2px] rounded-3xl p-2 px-5`}
          >
            <Text className="text-center text-base">{i.value}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable
        onPress={handleAll}
        className="border-[0.5px] rounded-xl h-6  w-20  py-[0.8px] "
      >
        <Text className="text-center">View All</Text>
      </Pressable>
    </View>
  );
};

export default WalletFilters;

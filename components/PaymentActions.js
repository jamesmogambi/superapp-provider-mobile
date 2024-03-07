import { View, Text, Pressable } from "react-native";
import React from "react";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PaymentActions = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-row justify-between">
      <Pressable
        onPress={() => navigation.navigate("Transactions")}
        className="bg-green-50 w-28  space-x-2 p-2  px-4 flex-row items-center  border-[0.5px] rounded-xl border-green-500"
      >
        <AntDesign name="clockcircle" size={20} color="#16a34a" />
        <Text className="text-base">History</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("TransferFund")}
        className=" w-28  space-x-2 p-2  px-4 flex-row  border-[0.5px] rounded-xl "
      >
        <MaterialCommunityIcons
          name="arrow-up-circle"
          size={24}
          color="#404040"
        />
        <Text className="text-base">Pay</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("TopUp")}
        className=" w-28  space-x-2 p-2 px-4 flex-row items-center  border-[0.5px] rounded-xl "
      >
        <AntDesign name="pluscircle" size={20} color="#404040" />
        <Text className="text-base">TopUp</Text>
      </Pressable>
    </View>
  );
};

export default PaymentActions;

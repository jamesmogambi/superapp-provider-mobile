import { View, Text } from "react-native";
import React, { useState } from "react";
import ButtonContained from "./ButtonContained";
import InputOutline from "./InputOutline";
import { useNavigation } from "@react-navigation/native";

const LoginForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigation = useNavigation();

  return (
    <View className="flex-1 p-4 justify-center">
      <View className="">
        <View className="space-y-2">
          <Text className="text-3xl ">Welcome to</Text>
          <Text className="text-green-600 text-4xl font-bold">
            FOX-JEK 2024
          </Text>
        </View>
        {/* phone input */}
        <View className="mt-4">
          <InputOutline
            icon={"phone-outline"}
            value={phoneNumber}
            onChange={setPhoneNumber}
            label={"Mobile Number"}
            keyboardType="number-pad"
          />
        </View>
        <View className={`${!phoneNumber && "opacity-70"} mt-8`}>
          <ButtonContained
            label="Login"
            handlePress={() => navigation.navigate("OTP")}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginForm;

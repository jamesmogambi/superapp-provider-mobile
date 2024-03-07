import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ButtonContained from "./ButtonContained";
import AnimatedOtp from "./AnimatedOtp";

const OTPForm = () => {
  const [code, setCode] = useState("");

  const navigation = useNavigation();
  return (
    <View>
      <View className="">
        <View>
          <Pressable onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </Pressable>
        </View>
        <View className="space-y-2.5 mt-5">
          <Text className="text-2xl ">Enter OTP Send to</Text>
          <Text className="text-green-600 text-2xl ">+254701694004</Text>
        </View>
        <View className="mt-4">
          <AnimatedOtp />
        </View>
        <View className={`${!code && "opacity-70"} mt-12`}>
          <ButtonContained
            label="Verify"
            handlePress={() => navigation.navigate("Register")}
          />
        </View>
        <View className="mt-12">
          <Text className="text-base text-center text-neutral-500">
            Still waiting for the SMS verification code?
          </Text>
          <Text className="text-base text-center text-neutral-500">
            Click the below link to resend the code.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OTPForm;

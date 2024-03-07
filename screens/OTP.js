import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import OTPForm from "../components/OTPForm";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthCodeActionsheet from "../components/AuthCodeActionsheet";

const OTP = () => {
  const [showActionsheet, setShowActionSheet] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AuthCodeActionsheet
        isVisible={showActionsheet}
        onCancel={() => setShowActionSheet(false)}
      />
      <View className="flex-1 p-4">
        <OTPForm />
        <View className="flex-row justify-center mt-8">
          <Pressable
            onPress={() => setShowActionSheet(true)}
            className="border-[0.5px] p-2.5 px-3 rounded-2xl "
          >
            <Text className="text-base">Didn't receive the code?</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OTP;

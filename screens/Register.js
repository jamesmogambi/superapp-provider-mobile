import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4">
        <ScrollView showsVerticalScrollIndicator={false}>
          <RegisterForm />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Register;

import { View, Text, ScrollView, Platform } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Stack from "../components/Stack";
import ProfileForm from "../components/ProfileForm";

const EditProfile = () => {
  const navigation = useNavigation();

  const handleSubmitSuccess = () => {
    navigation.navigate("Root", { screen: "Home" });
  };

  return (
    <Stack>
      <SafeAreaView className="flex-1 bg-white" edges={["bottom"]}>
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.select({ ios: 0, android: 20 })}
        >
          <ProfileForm onSubmitSuccess={handleSubmitSuccess} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Stack>
  );
};

export default EditProfile;

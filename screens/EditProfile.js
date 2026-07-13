import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
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
      <SafeAreaView className="flex-1 p-4 pt-0" edges={["bottom"]}>
        <ProfileForm onSubmitSuccess={handleSubmitSuccess} />
      </SafeAreaView>
    </Stack>
  );
};

export default EditProfile;

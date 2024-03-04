import { View, Text, ScrollView } from "react-native";
import React from "react";
import Stack from "../components/Stack";
import ProfileForm from "../components/ProfileForm";

const EditProfile = () => {
  return (
    <Stack>
      <View className=" flex-1 p-4 pt-0">
        <ProfileForm />
      </View>
    </Stack>
  );
};

export default EditProfile;

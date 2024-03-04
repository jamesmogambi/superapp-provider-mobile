import { View, Text } from "react-native";
import React from "react";
import Stack from "../components/Stack";
import AddPackageForm from "../components/AddPackageForm";

const AddPackage = () => {
  return (
    <Stack>
      <View className="p-4 flex-1">
        <AddPackageForm />
      </View>
    </Stack>
  );
};

export default AddPackage;

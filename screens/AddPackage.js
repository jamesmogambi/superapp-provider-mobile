import { View } from "react-native";
import React, { useEffect } from "react";
import Stack from "../components/Stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import AddPackageForm from "../components/AddPackageForm";

const AddPackage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { packageItem, service } = route.params || {};

  useEffect(() => {
    navigation.setOptions({ title: packageItem ? "Edit Package" : "Add Package" });
  }, [navigation, packageItem]);

  return (
    <Stack>
      <View className="p-4 flex-1">
        <AddPackageForm />
      </View>
    </Stack>
  );
};

export default AddPackage;

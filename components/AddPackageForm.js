import { View, Text, ScrollView, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useUser } from "@clerk/clerk-expo";
import { MaterialIcons } from "@expo/vector-icons";
import InputOutline from "./InputOutline";
import { neutral400 } from "../constants/colors";
import ButtonContained from "./ButtonContained";
import { addPackage, updatePackage } from "../services/service";

const AddPackageForm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { service, packageItem } = route.params || {};
  const { user } = useUser();

  const initialValues = {
    packageName: packageItem?.name || "",
    description: packageItem?.description || "",
    price: packageItem?.cost != null ? String(packageItem.cost) : "",
    maxBookQuantity: packageItem?.maxBookQuantity
      ? String(packageItem.maxBookQuantity)
      : "",
  };

  const handleSubmit = async (values) => {
    const payload = {
      name: values.packageName,
      description: values.description,
      cost: values.price,
      maxBookQuantity: values.maxBookQuantity,
    };
    try {
      if (packageItem?.id) {
        await updatePackage(packageItem.id, payload);
      } else {
        await addPackage(user.id, service.id, payload);
      }
      navigation.goBack();
    } catch {
      Alert.alert("Error", "Failed to save package. Please try again.");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
        <View className="flex-1 justify-between space-y-3">
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="space-y-3">
              <InputOutline
                icon={"package-variant-closed"}
                label="Package Name"
                value={values.packageName}
                onChange={handleChange("packageName")}
              />
              <InputOutline
                icon={"package-variant-closed"}
                label="Package Description"
                value={values.description}
                onChange={handleChange("description")}
                multiline
                numberOfLines={4}
              />

              <InputOutline
                icon={"cash-multiple"}
                label="Package Price"
                value={values.price}
                onChange={handleChange("price")}
                keyboardType="numeric"
              />
              <InputOutline
                icon={"sort-numeric-variant"}
                label="Max Book Quantity"
                value={values.maxBookQuantity}
                onChange={handleChange("maxBookQuantity")}
                keyboardType="numeric"
              />
            </View>
          </ScrollView>
          <SafeAreaView edges={["bottom"]}>
            <View className="p-4">
              <ButtonContained
                label={packageItem ? "Update" : "Save"}
                disabled={isSubmitting}
                handlePress={handleSubmit}
              />
            </View>
          </SafeAreaView>
        </View>
      )}
    </Formik>
  );
};

export default AddPackageForm;

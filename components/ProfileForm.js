import { View, Text, Alert, Image, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import InputOutline from "./InputOutline";
import ButtonContained from "./ButtonContained";
import { Formik } from "formik";
import { RadioButton } from "react-native-paper";
import { green600 } from "../constants/colors";
import SelectInput from "./SelectInput";
import { MaterialIcons } from "@expo/vector-icons";
import ButtonOutline from "./ButtonOutline";
import { useUser } from "@clerk/clerk-expo";
import { saveProviderProfile, getProviderProfile } from "../services/profile";
import { useNavigation } from "@react-navigation/native";

const buildInitialValues = (user, dbProfile = {}) => ({
  fullName: dbProfile.fullName || user?.fullName || "",
  gender: dbProfile.gender || "",
  email: dbProfile.email || user?.primaryEmailAddress?.emailAddress || "",
  mobileNumber: dbProfile.mobileNumber || "",
  image: dbProfile.imageUrl || user?.imageUrl || "",
  landmark: dbProfile.landmark || "",
  homeLocation: dbProfile.homeLocation || "",
  serviceRadius: dbProfile.serviceRadius || "10.0 Km",
  minOrder: dbProfile.minOrder || "0.0",
});

const DEFAULT_AVATAR = "https://mui.com/static/images/avatar/1.jpg";

const ProfileForm = ({ onSubmitSuccess }) => {
  const { user, isLoaded } = useUser();
  const navigation = useNavigation();
  const [initialValues, setInitialValues] = useState(() =>
    buildInitialValues(user),
  );
  const [dbProfile, setDbProfile] = useState(null);

  const pickImage = async (setFieldValue) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFieldValue("image", result.assets[0].uri);
    }
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await saveProviderProfile(user, values);
      Alert.alert("Success", "Your profile has been updated.", [
        {
          text: "OK",
          onPress: () => {
            if (typeof onSubmitSuccess === "function") {
              onSubmitSuccess();
            } else {
              navigation.navigate("Home");
            }
          },
        },
      ]);
    } catch (err) {
      Alert.alert(
        "Update failed",
        err?.message || "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-neutral-500">Loading profile…</Text>
      </View>
    );
  }

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      if (!user?.id) return;
      try {
        const data = await getProviderProfile(user.id);
        if (active) {
          setDbProfile(data || null);
          setInitialValues(buildInitialValues(user, data || {}));
        }
      } catch {
        if (active) {
          setInitialValues(buildInitialValues(user));
        }
      }
    };

    loadProfile();

    return () => {
      active = false;
    };
  }, [user?.id, isLoaded]);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        setFieldValue,
        isSubmitting,
      }) => (
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="p-4">
            {/* Header */}
            {/* <View className="pt-2 pb-6">
              <Text className="text-3xl font-bold text-neutral-800">
                Edit Profile
              </Text>
              <Text className="text-neutral-500 mt-1">
                Manage your personal information
              </Text>
            </View> */}

            {/* Profile Image */}
            <View className="items-center pb-8 pt-4">
              <View className="items-center space-y-2">
                <Image
                  className="h-20 w-20 rounded-full"
                  source={{ uri: values.image || DEFAULT_AVATAR }}
                />
                <Pressable
                  onPress={() => pickImage(setFieldValue)}
                  disabled={isSubmitting}
                >
                  <Text className="text-lg font-medium text-green-600">
                    Change Picture
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Personal Information */}
            <View className="mb-6">
              <Text className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3 ml-1">
                Personal Information
              </Text>
              <View className="space-y-3">
                <InputOutline
                  icon="account-outline"
                  label="Full Name"
                  value={values.fullName}
                  onChange={handleChange("fullName")}
                />

                <View className="bg-neutral-50 p-4 rounded-2xl">
                  <Text className="text-sm text-neutral-500 mb-2 ml-1">
                    Gender
                  </Text>
                  <RadioButton.Group
                    onValueChange={handleChange("gender")}
                    value={values.gender}
                  >
                    <View className="flex-row space-x-6">
                      <View className="flex-row items-center">
                        <Text className="text-base text-neutral-700">Male</Text>
                        <RadioButton value="Male" color={green600} />
                      </View>
                      <View className="flex-row items-center">
                        <Text className="text-base text-neutral-700">
                          Female
                        </Text>
                        <RadioButton value="Female" color={green600} />
                      </View>
                    </View>
                  </RadioButton.Group>
                </View>
              </View>
            </View>

            {/* Contact & Location */}
            <View className="mb-6">
              <Text className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3 ml-1">
                Contact & Location
              </Text>
              <View className="space-y-3">
                <InputOutline
                  icon="email-edit-outline"
                  label="Email Address"
                  value={values.email}
                  onChange={handleChange("email")}
                />

                <InputOutline
                  icon="phone-outline"
                  label="Mobile Number"
                  value={values.mobileNumber}
                  onChange={handleChange("mobileNumber")}
                  keyboardType="phone-pad"
                />

                <InputOutline
                  icon="map-marker-outline"
                  label="Landmark"
                  value={values.landmark}
                  onChange={handleChange("landmark")}
                />

                <InputOutline
                  icon="crosshairs-gps"
                  label="Home Location"
                  value={values.homeLocation}
                  onChange={handleChange("homeLocation")}
                />
              </View>
            </View>

            {/* Service Settings */}
            <View className="mb-8">
              <Text className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3 ml-1">
                Service Settings
              </Text>
              <View className="space-y-3">
                <SelectInput
                  data={[
                    "0.5 Km",
                    "1.0 Km",
                    "5.0 Km",
                    "10.0 Km",
                    "15.0 Km",
                    "20.0 Km",
                    "25.0 Km",
                    "30.0 Km",
                  ]}
                  onChange={handleChange("serviceRadius")}
                  label="Store delivery radius"
                  value={values.serviceRadius}
                  defaultValue={"10.0 Km"}
                  icon={
                    <MaterialIcons
                      name="location-searching"
                      size={24}
                      color="#737373"
                    />
                  }
                />

                <InputOutline
                  icon="cash-multiple"
                  label="Minimum order"
                  value={values.minOrder}
                  onChange={handleChange("minOrder")}
                />
              </View>
            </View>

            {/* Action Buttons */}
            <View className="flex-row justify-between mb-8">
              <View className="w-[48%]">
                <ButtonOutline label="Delete" />
              </View>
              <View className="w-[48%]">
                <ButtonContained
                  label={isSubmitting ? "Updating…" : "Update"}
                  handlePress={handleSubmit}
                  disabled={isSubmitting}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

export default ProfileForm;

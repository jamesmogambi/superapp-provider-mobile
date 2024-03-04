import { View, Text, Alert, Image, Pressable, ScrollView } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import InputOutline from "./InputOutline";
import ButtonContained from "./ButtonContained";
import { Formik } from "formik";
import * as yup from "yup";
import { RadioButton } from "react-native-paper";
import { green600 } from "../constants/colors";
import SelectInput from "./SelectInput";
import { MaterialIcons } from "@expo/vector-icons";
import ButtonOutline from "./ButtonOutline";

const initialValues = {
  fullName: "",
  gender: "",
  email: "",
  mobileNumber: "",
  image: "",
  landmark: "",
  homeLocation: "",
  serviceRadius: "",
  minOrder: "0.0",
};
const ProfileForm = () => {
  const pickImage = async (handleChange) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      handleChange("image", result.assets[0].uri);
    }
  };

  const onSubmit = (data) => {
    Alert.alert("Successful", JSON.stringify(data));
  };

  return (
    <Formik
      initialValues={initialValues}
      //   validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        setFieldValue,
      }) => (
        <View className="flex-1  border-red-300 justify-between space-y-4">
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="">
              {/* update image */}
              <View className="items-center pb-8 pt-4">
                <View className="items-center space-y-2">
                  <Image
                    className="h-20 w-20 rounded-full "
                    source={{
                      uri:
                        values.image ||
                        "https://mui.com/static/images/avatar/1.jpg",
                    }}
                  />
                  <Pressable onPress={() => pickImage(setFieldValue)}>
                    <Text className="text-lg font-medium text-green-600">
                      Change Picture
                    </Text>
                  </Pressable>
                </View>
              </View>
              {/* form inputs */}
              <View>
                <InputOutline
                  icon="account-outline"
                  label="Full Name"
                  value={values.fullName}
                  onChange={handleChange("fullName")}
                />

                <View className="flex-row items-center py-1 mt-2 ">
                  <Text className="mr-3 text-base">Gender</Text>
                  <RadioButton.Group
                    onValueChange={handleChange("gender")}
                    value={values.gender}
                  >
                    <View className="flex-row space-x-3">
                      <View className="flex-row items-center ">
                        <Text className="text-base">Male</Text>
                        <RadioButton value="Male" color={green600} />
                      </View>
                      <View className="flex-row items-center">
                        <Text className="text-base">Female</Text>
                        <RadioButton value="Female" color={green600} />
                      </View>
                    </View>
                  </RadioButton.Group>
                </View>
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
                    value={values.phone}
                    onChange={handleChange("phone")}
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
                    onChange={handleChange("storeDeliveryRadius")}
                    label="Store delivery radius"
                    value={values.storeDeliveryRadius}
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
            </View>
          </ScrollView>

          <View className="flex-row  justify-between">
            {/* action buttons */}
            <View className="w-[48%]">
              <ButtonOutline label="Delete" />
            </View>
            <View className="w-[48%]">
              <ButtonContained label="Update" handlePress={handleSubmit} />
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default ProfileForm;

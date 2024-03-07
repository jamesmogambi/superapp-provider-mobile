import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import InputOutline from "./InputOutline";
import { Checkbox } from "react-native-paper";
import { green600 } from "../constants/colors";
import ButtonContained from "./ButtonContained";

const RegisterForm = ({ onSubmit }) => {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
  return (
    <Formik
      initialValues={{
        mobileNumber: "",
        fullName: "",
        email: "",
      }}
      onSubmit={onSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View>
          <View>
            <Pressable onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </Pressable>
          </View>
          <View className="space-y-2.5 mt-5">
            <Text className="text-2xl ">Get started with</Text>
            <Text className="text-green-600 text-2xl ">Fox-jek 2024</Text>
          </View>
          <View className="space-y-4 mt-5">
            <View>
              <InputOutline
                label={"Mobile Number"}
                onChange={handleChange("mobileNumber")}
                value={values.mobileNumber}
              />
            </View>
            <View>
              <InputOutline
                label={"Mobile Number"}
                onChange={handleChange("mobileNumber")}
                value={values.mobileNumber}
              />
            </View>
            <View>
              <InputOutline
                label={"Email Address*"}
                onChange={handleChange("email")}
                value={values.email}
              />
            </View>
          </View>
          <View className="flex-row space-x-2 py-5">
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
              }}
              color={green600}
            />
            <View>
              <Text className="tracking-wide">
                By Registering you agree with our
              </Text>
              <Text className="text-green-600 underline tracking-wide">
                Term & Condition of use
              </Text>
            </View>
          </View>
          <View>
            <ButtonContained label={"Register"} />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default RegisterForm;

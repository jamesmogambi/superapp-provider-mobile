import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import { Formik } from "formik";
import InputOutline from "./InputOutline";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ButtonContained from "./ButtonContained";

const TransferFundForm = ({ onSubmit }) => {
  const navigation = useNavigation();
  return (
    <Formik
      initialValues={{
        beneficial: "",
        beneficialContact: "",
        beneficialEmail: "",
        amount: "",
      }}
      onSubmit={onSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View className=" justify-between flex-1 ">
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="gap-3">
              <Pressable
                onPress={() => navigation.navigate("SearchContact")}
                className="flex-row border-[0.5px] rounded-[15px] p-3 items-center space-x-3  "
              >
                <AntDesign name="search1" size={20} color="black" />
                <Text className="text-neutral-500 text-base">
                  Search by Contact or Email
                </Text>
              </Pressable>
              <View>
                <InputOutline
                  label="Beneficial"
                  onChange={handleChange("beneficial")}
                  value={values.beneficial}
                  icon="account-outline"
                  editable={false}
                />
              </View>

              <View>
                <InputOutline
                  label="Beneficial contact number"
                  onChange={handleChange("beneficialContact")}
                  value={values.beneficialContact}
                  icon="phone-outline"
                  editable={false}
                />
              </View>

              <View>
                <InputOutline
                  label="Beneficial email"
                  onChange={handleChange("beneficialEmail")}
                  value={values.beneficialEmail}
                  icon="email-outline"
                  editable={false}
                />
              </View>

              <View>
                <InputOutline
                  label="Amount to transfer"
                  onChange={handleChange("amount")}
                  value={values.amount}
                  icon="cash-multiple"
                />
              </View>
            </View>
          </ScrollView>
          <View className="py-4 ">
            <ButtonContained label="Transfer" onPress={handleSubmit} />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default TransferFundForm;

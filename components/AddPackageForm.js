import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Formik } from "formik";
import SelectInput from "./SelectInput";
import { MaterialIcons } from "@expo/vector-icons";
import InputOutline from "./InputOutline";
import { neutral400 } from "../constants/colors";
import ButtonContained from "./ButtonContained";

const categories = [
  {
    name: "Dog Walking",
    checked: true,
  },
  {
    name: "Pet Care",
    checked: true,
  },
  {
    name: "Baby Care",
    checked: true,
  },
  {
    name: "Dog Walking",
    checked: false,
  },
  {
    name: "Dog Walking",
    checked: false,
  },
  {
    name: "Dog Walking",
    checked: true,
  },
  {
    name: "Dog Walking",
    checked: true,
  },
  {
    name: "Dog Walking",
    checked: true,
  },
  {
    name: "Dog Walking",
    checked: true,
  },
  {
    name: "Dog Walking",
    checked: true,
  },
  {
    name: "Dog Walking",
    checked: true,
  },
  {
    name: "Dog Walking",
    checked: true,
  },
];
const AddPackageForm = () => {
  return (
    <Formik
      initialValues={{
        category: "",
        packageName: "",
        description: "",
        price: "",
        maxBookQuantity: "",
      }}
      onSubmit={() => {}}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View className="flex-1 justify-between space-y-3">
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="space-y-3">
              <SelectInput
                label="Select Category"
                data={categories}
                defaultValue="AC Repair"
                icon={
                  <MaterialIcons name="category" size={24} color={neutral400} />
                }
                onChange={handleChange("category")}
                value={values.category}
              />
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
              />
              <InputOutline
                icon={"sort-numeric-variant"}
                label="Max Book Quantity"
                value={values.maxBookQuantity}
                onChange={handleChange("maxBookQuantity")}
              />
            </View>
          </ScrollView>
          <View>
            <ButtonContained label={"Save"} />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default AddPackageForm;

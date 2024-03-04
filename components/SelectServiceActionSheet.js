import { View, Text, Pressable, Dimensions, FlatList } from "react-native";
import React from "react";
import ActionSheet from "./ActionSheet";
import { Feather } from "@expo/vector-icons";
import ButtonContained from "./ButtonContained";
import { Checkbox, Divider } from "react-native-paper";
import { green600 } from "../constants/colors";

const services = [
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

const height = Dimensions.get("window").height;

const SelectServiceActionSheet = ({ isVisible, onCancel }) => {
  const [checked, setChecked] = React.useState(false);
  return (
    <ActionSheet isVisible={isVisible} onCancel={onCancel}>
      <View style={{ height: height / 2 }}>
        <View className="justify-center w-full items-center absolute  -top-16">
          <Pressable onPress={onCancel} className="bg-white rounded-full p-1">
            <Feather name="x" size={24} color="black" />
          </Pressable>
        </View>
        <View className="flex-1">
          <View className="p-4">
            <Text className="text-lg font-medium text-neutral-800">
              Select Services
            </Text>
          </View>
          <Divider />

          <View className="p-4 pt-0  flex-1">
            <FlatList
              data={services}
              renderItem={({ item, index }) => (
                <View className="flex-row justify-between">
                  <Text className="text-base">{item.name}</Text>
                  <Checkbox
                    status={item.checked ? "checked" : "unchecked"}
                    onPress={() => {
                      setChecked(!checked);
                    }}
                    color={green600}
                  />
                </View>
              )}
              keyExtractor={(item, index) => item + index}
              showsVerticalScrollIndicator={false}
              //   ItemSeparatorComponent={<Divider />}
            />
          </View>
          <View className="px-[30%] py-2">
            <ButtonContained label={"Done"} />
          </View>
        </View>
      </View>
    </ActionSheet>
  );
};

export default SelectServiceActionSheet;

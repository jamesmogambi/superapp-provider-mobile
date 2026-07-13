import { View, Text, Pressable, Dimensions, FlatList } from "react-native";
import React from "react";
import ActionSheet from "./ActionSheet";
import { Feather } from "@expo/vector-icons";
import ButtonContained from "./ButtonContained";
import { Checkbox, Divider } from "react-native-paper";
import { green600 } from "../constants/colors";

const height = Dimensions.get("window").height;

const SelectServiceActionSheet = ({ isVisible, onCancel, services = [] }) => {
  const renderItem = ({ item }) => (
    <View className="flex-row justify-between">
      <Text className="text-base">{item.name}</Text>
      <Checkbox status="unchecked" color={green600} />
    </View>
  );

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
              renderItem={renderItem}
              keyExtractor={(item, index) => item.id || item.name + index}
              showsVerticalScrollIndicator={false}
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

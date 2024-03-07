import { View, Text, Pressable } from "react-native";
import { Divider, RadioButton } from "react-native-paper";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import ActionSheet from "./ActionSheet";
import { green600 } from "../constants/colors";
import ButtonContained from "./ButtonContained";

const filters = [
  "Today",
  "Upcoming",
  "Last 7 Days",
  "Last 30 Days",
  "This Year",
  "All",
];
const FilterOrderActionSheet = ({
  isVisible,
  onCancel,
  data = filters,
  title = "Filter By",
}) => {
  const [value, setValue] = useState("Today");
  return (
    <ActionSheet isVisible={isVisible} onCancel={onCancel}>
      <View className="justify-center w-full items-center absolute  -top-16">
        <Pressable onPress={onCancel} className="bg-white rounded-full p-1">
          <Feather name="x" size={24} color="black" />
        </Pressable>
      </View>
      <View>
        <View className="p-4">
          <Text className="text-lg font-medium text-neutral-800">{title}</Text>
        </View>
        <Divider />

        <View className="p-4">
          <RadioButton.Group
            onValueChange={(newValue) => setValue(newValue)}
            value={value}
          >
            {data?.map((i, k) => (
              <View key={k} className="flex-row justify-between">
                <Text className="text-base text-neutral-600">{i}</Text>
                <RadioButton value={i} color={green600} />
              </View>
            ))}
          </RadioButton.Group>
        </View>
        <View className="px-[30%] py-4">
          <ButtonContained label={"Apply Filter"} />
        </View>
      </View>
    </ActionSheet>
  );
};

export default FilterOrderActionSheet;

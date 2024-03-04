import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const Chips = ({
  options,
  selectedOption,
  handlePressChip,
  handleDropDownChip,
}) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex-row space-x-3 px-2">
        {options.map((i, k) => (
          <Pressable
            className={`${
              i.name === selectedOption && "bg-green-50 border-green-600"
            } flex-row border-[0.5px] rounded-3xl p-2 px-3`}
            key={k}
            icon="information"
            onPress={
              i?.dropDown === true
                ? () => handleDropDownChip(i.name)
                : () => handlePressChip(i.name)
            }
          >
            <Text className="text-base">{i.name}</Text>
            {i?.dropDown && (
              <MaterialIcons name="arrow-drop-down" size={24} color="black" />
            )}
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default Chips;

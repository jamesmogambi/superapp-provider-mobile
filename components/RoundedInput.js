import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const RoundedInput = ({
  value,
  handleChange,
  label,
  icon = <Ionicons name="search-outline" size={24} color="#4b5563" />,
  keyboardType = "default",
  bg = "transparent",
}) => {
  const [focused, setFocus] = useState(false);
  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };
  return (
    <View
      className={`${
        focused ? "border-green-600 " : "border-black"
      } ${bg} border-[0.5px] p-2  rounded-2xl space-x-3 flex flex-row  items-center`}
    >
      {icon}
      <TextInput
        placeholder={label}
        value={value}
        underlineColorAndroid="transparent"
        onChangeText={(text) => handleChange(text)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="text-base flex-1"
      />
    </View>
  );
};

export default RoundedInput;

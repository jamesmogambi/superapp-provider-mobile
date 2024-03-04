import { View, Text } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import { green600, neutral400 } from "../constants/colors";

const SelectInput = ({
  data,
  label = "Label",
  value = "select",
  defaultValue = "",
  icon,
  onChange,
  ...otherProps
}) => {
  const [focused, setFocus] = useState(false);
  return (
    <TextInput
      mode="outlined"
      label={<Text className={`text-neutral-400 mx-1`}>{label}</Text>}
      value={defaultValue}
      render={() => (
        <View className="p-1 mt-1 justify-center  flex-row items-center px-3 ">
          {icon && icon}
          <SelectDropdown
            defaultValue={defaultValue && defaultValue}
            dropdownStyle={{ backgroundColor: "#f5f5f5" }}
            buttonStyle={{
              flex: 1,
              height: 30,
              marginRight: 10,
              backgroundColor: "transparent",
            }}
            buttonTextStyle={{
              position: "absolute",
              right: 5,
              color: "#525252",
              fontSize: 15,
            }}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            data={data}
            onSelect={onChange}
            renderDropdownIcon={() => (
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="black"
              />
            )}
          />
        </View>
      )}
      outlineColor={focused ? green600 : neutral400}
      outlineStyle={{ borderRadius: 20, borderWidth: 0.5 }}
      style={{
        fontSize: 16,
        backgroundColor: "white",
      }}
      {...otherProps}
    />
  );
};

export default SelectInput;

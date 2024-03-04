import { View, Text } from "react-native";
import { TextInput } from "react-native-paper";
import { green600 } from "../constants/colors";

const InputOutline = ({ value, icon, label, onChange, ...otherProps }) => {
  return (
    <TextInput
      mode="outlined"
      label={<Text className="text-neutral-400">{label}</Text>}
      value={value}
      onChangeText={onChange}
      outlineColor="black"
      activeOutlineColor={green600}
      outlineStyle={{ borderRadius: 16, borderWidth: 0.8 }}
      left={icon && <TextInput.Icon icon={icon} color={"#737373"} />}
      style={{ backgroundColor: "transparent", fontSize: 16 }}
      {...otherProps}
    />
  );
};

export default InputOutline;

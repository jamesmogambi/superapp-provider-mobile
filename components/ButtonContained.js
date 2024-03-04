import React from "react";
import { green600 } from "../constants/colors";
import { Button } from "react-native-paper";

const ButtonContained = ({ label, btnColor = green600, icon, handlePress }) => {
  return (
    <Button
      icon={icon && icon}
      mode="contained"
      onPress={handlePress}
      buttonColor={btnColor}
      className="rounded-xl"
      // labelStyle={{ fontSize: 17 }}
    >
      {label}
    </Button>
  );
};

export default ButtonContained;

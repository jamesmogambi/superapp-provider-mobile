import { Button } from "react-native-paper";

const ButtonOutline = ({ label, icon, handlePress }) => {
  return (
    <Button
      icon={icon && icon}
      mode="outlined"
      onPress={handlePress}
      className="rounded-xl"
      labelStyle={{ color: "black" }}
    >
      {label}
    </Button>
  );
};

export default ButtonOutline;

import { View, Text } from "react-native";
import Stack from "../components/Stack";
import TopUpForm from "../components/TopUpForm";

const TopUp = () => {
  const onSubmit = (param) => {
    console.log("submit", param);
  };

  return (
    <Stack>
      <TopUpForm onSubmit={onSubmit} />
    </Stack>
  );
};

export default TopUp;

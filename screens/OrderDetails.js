import { View, Text, ScrollView } from "react-native";
import Stack from "../components/Stack";
import ButtonContained from "../components/ButtonContained";
import OrderDetail from "../components/OrderDetail";

const OrderDetails = () => {
  return (
    <Stack>
      <ScrollView showsVerticalScrollIndicator={false}>
        <OrderDetail />
      </ScrollView>
      <View className="absolute bottom-2  w-full flex-row justify-around">
        <View className="w-[48%]">
          <ButtonContained label={"Reject"} btnColor="#ef4444" />
        </View>
        <View className="w-[48%]">
          <ButtonContained label={"Accept"} />
        </View>
      </View>
    </Stack>
  );
};

export default OrderDetails;

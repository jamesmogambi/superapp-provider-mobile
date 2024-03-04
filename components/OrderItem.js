import { View, Text, Pressable, Image } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { green600 } from "../constants/colors";

const OrderItem = ({ item }) => {
  const { orderId, order, status, serviceImage, bookingDate, service } = item;
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate("OrderDetails")}
      className="space-y-2"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center space-x-2">
          <Image source={serviceImage} className="rounded-full h-12 w-12 " />
          <Text className="font-semibold text-base">{service}</Text>
        </View>
        <Text className="text-green-600 font-semibold text-base">
          Ksh 1000.00
        </Text>
      </View>
      <Text className="text-base font-semibold text-neutral-700">
        Order ID : #{orderId}
      </Text>

      <View className="flex-row space-x-2">
        {/* <MaterialCommunityIcons name="clock" size={20} color={green600} /> */}
        <MaterialCommunityIcons
          name="calendar-clock"
          size={20}
          color={green600}
        />
        <Text className="italic text-neutral-700">{bookingDate}</Text>
      </View>
      <View className="flex-row space-x-2 items-center">
        <MaterialCommunityIcons name="hand-coin" size={20} color={green600} />
        <View className="flex-1 flex-row  space-x-1 flex-wrap">
          {order.map((i, k) => (
            <View key={k} className="flex-row items-center ">
              <Text className="text-neutral-700">{i.name}</Text>
              <Feather name="x" size={15} color="black" />
              <Text className="text-neutral-700">
                {i.quantity} {k !== order.length - 1 && ","}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* action buttons */}
      <View>
        {status === "New Order" && (
          <View className="flex-row justify-between">
            <Pressable className="border-[0.5px] rounded-xl w-[22%] p-1.5 justify-center items-center">
              <Text className="">View</Text>
            </Pressable>
            <Pressable className="bg-red-600  w-[22%] p-1.5 rounded-xl justify-center items-center">
              <Text className="text-white ">Reject</Text>
            </Pressable>
            <Pressable className="bg-green-600 w-[50%] p-1.5 rounded-xl justify-center items-center">
              <Text className="text-white ">Accept</Text>
            </Pressable>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default OrderItem;

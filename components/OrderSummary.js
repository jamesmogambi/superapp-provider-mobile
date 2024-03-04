import { View, Text, ScrollView } from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";
import { green600 } from "../constants/colors";

const OrderSummary = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex-row space-x-4 px-2 ">
        <View className="bg-blue-50 p-2 rounded-lg  ">
          <View className=" flex-row">
            <View className=" p-1 bg-blue-100 rounded-md">
              <MaterialCommunityIcons
                name="cash-multiple"
                size={24}
                color="#1e40af"
              />
            </View>
          </View>
          <View className="mt-4">
            <Text className="text-blue-700 text-base font-semibold ">
              Total
            </Text>
            <Text className="text-blue-700 text-base font-semibold">
              Revenue
            </Text>
          </View>

          <View className="bg-white w-32 py-1 rounded-md  mt-2  item-center">
            <Text className="text-blue-700 font-semibold text-base text-center">
              Ksh 1250.50
            </Text>
          </View>
        </View>
        <View className="bg-green-50 p-2 rounded-lg  ">
          <View className=" flex-row">
            <View className=" p-1 bg-green-100 rounded-md">
              <FontAwesome6 name="clipboard-check" size={24} color={green600} />
            </View>
          </View>
          <View className="mt-4">
            <Text className="text-green-600 text-base font-semibold ">
              Completed
            </Text>
            <Text className="text-green-600 text-base font-semibold">
              Orders
            </Text>
          </View>

          <View className="bg-white w-32 py-1 rounded-md  mt-2  item-center">
            <Text className="text-green-600 font-semibold text-base text-center">
              20
            </Text>
          </View>
        </View>
        <View className="bg-red-50 p-2 rounded-lg  ">
          <View className=" flex-row">
            <View className=" p-1 bg-red-100 rounded-md">
              <MaterialCommunityIcons
                name="book-cancel"
                size={24}
                color="#dc2626"
              />
            </View>
          </View>
          <View className="mt-4">
            <Text className="text-red-600 text-base font-semibold ">
              Canceled
            </Text>
            <Text className="text-red-600 text-base font-semibold">Orders</Text>
          </View>

          <View className="bg-white w-32 py-1 rounded-md  mt-2  item-center">
            <Text className="text-red-600 font-semibold text-base text-center">
              20
            </Text>
          </View>
        </View>
        <View className="bg-purple-50 p-2 rounded-lg  ">
          <View className=" flex-row">
            <View className="bg-purple-100 p-1  rounded-md">
              <MaterialIcons name="pending" size={24} color="#7e22ce" />
            </View>
          </View>
          <View className="mt-4">
            <Text className="text-purple-600 text-base font-semibold ">
              Pending
            </Text>
            <Text className="text-purple-600 text-base font-semibold">
              Orders
            </Text>
          </View>

          <View className="bg-white w-32 py-1 rounded-md  mt-2  item-center">
            <Text className="text-purple-600 font-semibold text-base text-center">
              20
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderSummary;

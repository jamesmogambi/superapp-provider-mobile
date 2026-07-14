import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import { green600, neutral400 } from "../constants/colors";
import StatusBadge from "./StatusBadge";
import Cart from "./Cart";

const OrderDetail = ({ order }) => {
  if (!order) {
    return (
      <View className="p-4">
        <Text className="text-neutral-500">No order data available.</Text>
      </View>
    );
  }

  const {
    status,
    deliveryTime,
    customer,
    deliveryAddress,
    order: orderItems,
  } = order;

  return (
    <View>
      <View className="p-4 border-b-[1px] border-neutral-200 ">
        <View className="w-1/3">
          <StatusBadge status={status} />
        </View>
      </View>
      <View className="flex-row p-4 border-b-[1px] border-neutral-200 items-center gap-3 ">
        {/* <MaterialCommunityIcons
          name="calendar-clock"
          size={27}
          color={green600}
        /> */}
        <Ionicons name="calendar-clear-outline" size={27} color={green600} />
        <Text className=" text-base">{deliveryTime}</Text>
      </View>
      <View className=" border-b-[1px] border-neutral-200 p-4 space-y-3">
        {/* customer */}
        <View className="space-y-2">
          <Text className="font-medium text-lg">Customer </Text>
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-3">
              <Image
                className="rounded-xl h-16 w-16"
                source={{ uri: customer?.image }}
              />
              <View className="space-y-1">
                <Text className="font-medium">{customer?.name}</Text>
                <View className="flex-row space-x-1 items-center">
                  <Ionicons name="call-sharp" size={17} color={neutral400} />
                  <Text className="text-neutral-400">{customer?.phone}</Text>
                </View>
              </View>
            </View>
            <View className="flex-row space-x-2">
              <Pressable className="rounded-full bg-green-50 p-2">
                <Ionicons name="chatbox-ellipses" size={20} color={green600} />
              </Pressable>
              <Pressable className="rounded-full bg-green-50 p-2">
                <MaterialIcons name="call" size={20} color={green600} />
              </Pressable>
            </View>
          </View>
        </View>

        {/* delivery address */}

        {/*delivery instructions */}
        {/* {instruction && (
          <View>
            <Text className="font-medium text-lg">Instruction</Text>
            <Text className="text-neutral-500">{instruction}</Text>
          </View>
        )} */}
      </View>
      <View className="border-b-[1px] border-neutral-200 p-4">
        <Text className="font-medium text-lg">Delivery Address</Text>
        <Text className="text-neutral-500">{deliveryAddress}</Text>
      </View>
      {/* <View className="border-b-[1px] border-neutral-200 p-4 ">
        {deliveryPerson && (
          <View className="space-y-2">
            <Text className="text-lg font-medium">Delivery Person</Text>
            <View className="flex-row space-x-2">
              <Image
                className="h-14 w-14 rounded-full"
                source={deliveryPerson.image}
              />
              <View className="space-y-1">
                <Text>{deliveryPerson.name}</Text>
                <View className="flex-row space-x-2 items-center">
                  <FontAwesome name="star" size={15} color={amber300} />
                  <Text>{deliveryPerson.rating}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </View> */}
      <View className=" border-neutral-200 p-4">
        <Cart userOrder={{ ...order, order: orderItems }} />
      </View>
    </View>
  );
};

export default OrderDetail;

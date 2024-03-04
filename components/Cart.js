import { View, Text } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const Cart = ({ userOrder }) => {
  const { order, bookingID, paymentType, tax } = userOrder;
  return (
    <View>
      <Text className="text-lg font-medium">Booking ID #{bookingID}</Text>
      {/* loop through items */}
      <View className="space-y-2 border-b-[1px] py-2 pb-3 border-neutral-200">
        {order?.map((i, k) => (
          <View key={k}>
            <Text className="text-base font-semibold">{i.name}</Text>
            <View>
              {i?.items.map((i, k) => (
                <View key={k} className="space-y-1">
                  <Text className="">{i.name}</Text>
                  <View className="flex-row justify-between">
                    <View className="flex-row items-center gap-2">
                      <View className="border-[1px] rounded-md border-green-600 py-0.5 px-2">
                        <Text>{i.quantity}</Text>
                      </View>
                      <Feather name="x" size={18} color="black" />
                      <Text>Ksh {i.price}</Text>
                    </View>
                    <Text>Ksh 1000.00</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      <View className="flex-row justify-between py-1">
        <Text>Sub Total</Text>
        <Text>Ksh 5000</Text>
      </View>
      <View className="flex-row justify-between mb-2">
        <Text>Tax</Text>
        <Text>Ksh {tax}</Text>
      </View>

      <View className="flex-row justify-between py-2 border-y-[0.5px] border-neutral-300">
        <Text className=" font-bold">Total</Text>
        <Text className=" font-bold">ksh 800</Text>
      </View>

      <View className="flex-row justify-between py-2">
        <Text className="">Payment Type</Text>
        <Text className="">{paymentType}</Text>
      </View>
    </View>
  );
};

export default Cart;

import { View, Text } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const Cart = ({ userOrder }) => {
  const { order, tax, price } = userOrder;

  const subtotal = order?.reduce((acc, category) => {
    return (
      acc +
      category.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    );
  }, 0);

  const total = (price || subtotal) + (tax || 0);

  return (
    <View>
      {/* loop through items */}
      <View className="space-y-2 border-b-[1px] py-2 pb-3 border-neutral-200">
        {order?.map((category, k) => (
          <View key={k}>
            <Text className="text-base font-semibold">{category.name}</Text>
            <View>
              {category?.items.map((item, idx) => (
                <View key={idx} className="space-y-1">
                  <Text className="">{item.name}</Text>
                  <View className="flex-row justify-between">
                    <View className="flex-row items-center gap-2">
                      <View className="border-[1px] rounded-md border-green-600 py-0.5 px-2">
                        <Text>{item.quantity}</Text>
                      </View>
                      <Feather name="x" size={18} color="black" />
                      <Text>Ksh {item.price}</Text>
                    </View>
                    <Text>Ksh {item.quantity * item.price}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      <View className="flex-row justify-between py-1">
        <Text>Sub Total</Text>
        <Text>Ksh {subtotal}</Text>
      </View>
      <View className="flex-row justify-between mb-2">
        <Text>Tax</Text>
        <Text>Ksh {tax}</Text>
      </View>

      <View className="flex-row justify-between py-2 border-y-[0.5px] border-neutral-300">
        <Text className=" font-bold">Total</Text>
        <Text className=" font-bold">ksh {total}</Text>
      </View>
    </View>
  );
};

export default Cart;

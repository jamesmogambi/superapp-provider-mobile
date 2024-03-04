import { View, Text, FlatList } from "react-native";
import React from "react";
import { orders } from "../fixtures/order";
import Stack from "../components/Stack";
import { Divider } from "react-native-paper";
import OrderFooter from "../components/OrderFooter";
import OrderItem from "../components/OrderItem";

const status = "New Order";
const Orders = () => {
  const newOrders = orders.filter((item) => item.status === "New Order");

  return (
    <Stack>
      <FlatList
        data={newOrders}
        renderItem={({ item, index }) => (
          <View className="p-4">
            <OrderItem item={item} />
          </View>
        )}
        keyExtractor={(item, index) => item + index}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={<Divider />}
      />
      {status === "New Order" && (
        <View>
          <OrderFooter />
        </View>
      )}
    </Stack>
  );
};

export default Orders;

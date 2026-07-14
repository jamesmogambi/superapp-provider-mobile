import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { useRoute } from "@react-navigation/native";
import Stack from "../components/Stack";
import { Divider } from "react-native-paper";
import OrderFooter from "../components/OrderFooter";
import OrderItem from "../components/OrderItem";
import { getProviderOrders, resolveStatusFromTab } from "../services/order";

const Orders = () => {
  const { user } = useUser();
  const route = useRoute();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabName = route.name;
  const status = resolveStatusFromTab(tabName);

  const loadOrders = async () => {
    setLoading(true);
    const data = await getProviderOrders(user?.id, status);
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    if (user?.id) {
      loadOrders();
    }
  }, [user?.id, status]);

  if (loading) {
    return (
      <Stack>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      </Stack>
    );
  }

  return (
    <Stack>
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <View className="p-4">
            <OrderItem item={item} onStatusUpdate={loadOrders} />
          </View>
        )}
        keyExtractor={(item, index) => item.id || index.toString()}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={<Divider />}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-10">
            <Text className="text-gray-500">No orders found</Text>
          </View>
        }
      />
      {status === "new" && (
        <View>
          <OrderFooter />
        </View>
      )}
    </Stack>
  );
};

export default Orders;

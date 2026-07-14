import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Stack from "../components/Stack";
import ButtonContained from "../components/ButtonContained";
import OrderDetail from "../components/OrderDetail";
import { updateOrderStatus } from "../services/order";

const OrderDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const order = route.params?.order;
  const [loading, setLoading] = useState(null);

  if (!order) {
    return (
      <Stack>
        <View className="flex-1 items-center justify-center">
          <Text className="text-neutral-500">No order data available.</Text>
        </View>
      </Stack>
    );
  }

  const handleUpdateStatus = async (newStatus) => {
    if (!order?.id) return;
    setLoading(newStatus);
    try {
      const success = await updateOrderStatus(order.id, newStatus);
      if (success) {
        Alert.alert("Success", `Order ${newStatus} successfully.`);
        navigation.goBack();
      } else {
        Alert.alert("Error", "Failed to update order status. Please try again.");
      }
    } catch {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  const getActionButtons = () => {
    const normalizedStatus = order?.status?.toLowerCase?.();
    switch (normalizedStatus) {
      case "new":
        return [
          { label: "Reject", status: "rejected", btnColor: "#ef4444" },
          { label: "Accept", status: "accepted", btnColor: "#16a34a" },
        ];
      case "accepted":
        return [
          { label: "Start", status: "in-process", btnColor: "#2563eb" },
        ];
      case "in-process":
        return [
          { label: "Complete", status: "completed", btnColor: "#16a34a" },
        ];
      case "rejected":
      case "completed":
      default:
        return [];
    }
  };

  const actionButtons = getActionButtons();

  return (
    <Stack>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <OrderDetail order={order} />
      </ScrollView>
      {actionButtons.length > 0 && (
        <View
          className="absolute bottom-2 w-full flex-row justify-around"
          style={{ paddingBottom: Math.max(insets.bottom, 12) }}
        >
          {actionButtons.map((btn, idx) => (
            <View key={idx} className="w-[48%]">
              <ButtonContained
                label={btn.label}
                btnColor={btn.btnColor}
                handlePress={() => handleUpdateStatus(btn.status)}
                disabled={loading === btn.status}
              />
            </View>
          ))}
        </View>
      )}
    </Stack>
  );
};

export default OrderDetails;

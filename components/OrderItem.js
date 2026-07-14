import { View, Text, Pressable, Image } from "react-native";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { green600 } from "../constants/colors";
import { updateOrderStatus } from "../services/order";
import { Alert } from "react-native";
import React, { useState } from "react";

const OrderItem = ({ item, onStatusUpdate }) => {
  const {
    orderId,
    order,
    status,
    serviceImage,
    bookingDate,
    service,
    id,
    price,
    customer,
  } = item;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(null);

  const handleAction = async (buttonStatus) => {
    setLoading(buttonStatus);
    try {
      const success = await updateOrderStatus(id, buttonStatus);
      if (success) {
        Alert.alert("Success", `Order ${buttonStatus} successfully.`);
        onStatusUpdate?.();
      } else {
        Alert.alert(
          "Error",
          "Failed to update order status. Please try again.",
        );
      }
    } catch (err) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  const getActionButtons = () => {
    const normalizedStatus = status?.toLowerCase?.();
    switch (normalizedStatus) {
      case "new":
        return [
          {
            label: "View",
            action: "view",
            className:
              "border-[0.5px] rounded-xl w-[22%] p-1.5 justify-center items-center",
            textClassName: "",
          },
          {
            label: "Reject",
            action: "rejected",
            className:
              "bg-red-600 w-[22%] p-1.5 rounded-xl justify-center items-center",
            textClassName: "text-white",
          },
          {
            label: "Accept",
            action: "accepted",
            className:
              "bg-green-600 w-[50%] p-1.5 rounded-xl justify-center items-center",
            textClassName: "text-white",
          },
        ];
      case "accepted":
        return [
          {
            label: "View",
            action: "view",
            className:
              "border-[0.5px] rounded-xl w-[22%] p-1.5 justify-center items-center",
            textClassName: "",
          },
          {
            label: "Start",
            action: "in-process",
            className:
              "bg-blue-600 w-[78%] p-1.5 rounded-xl justify-center items-center",
            textClassName: "text-white",
          },
        ];
      case "in-process":
        return [
          {
            label: "View",
            action: "view",
            className:
              "border-[0.5px] rounded-xl w-[22%] p-1.5 justify-center items-center",
            textClassName: "",
          },
          {
            label: "Complete",
            action: "completed",
            className:
              "bg-green-600 w-[78%] p-1.5 rounded-xl justify-center items-center",
            textClassName: "text-white",
          },
        ];
      case "rejected":
      case "completed":
      default:
        return [
          {
            label: "View",
            action: "view",
            className:
              "w-full p-1.5 rounded-xl justify-center items-center border-[0.5px]",
            textClassName: "",
          },
        ];
    }
  };

  const actionButtons = getActionButtons();

  const handlePress = (btn) => {
    if (btn.action === "view") {
      navigation.navigate("OrderDetails", { order: item });
    } else {
      handleAction(btn.action);
    }
  };

  return (
    <View className="space-y-2">
      <Pressable
        onPress={() => navigation.navigate("OrderDetails", { order: item })}
        className="space-y-2"
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-2">
            <Image source={serviceImage} className="rounded-full h-12 w-12 " />
            <Text className="font-semibold text-base">{service}</Text>
          </View>
          <Text className="text-green-600 font-semibold text-base">
            Ksh {price?.toFixed?.(2) ?? price ?? "0.00"}
          </Text>
        </View>
        <Text className="text-base font-semibold text-neutral-700">
          Order ID : #{orderId}
        </Text>

        <View className="flex-row gap-2">
          {/* <MaterialCommunityIcons
            name="calendar-clock"
            size={20}
            color={green600}
          /> */}

          <Ionicons name="calendar-clear-outline" size={18} color={green600} />
          <Text className="italic text-neutral-700">{bookingDate}</Text>
        </View>
        <View className="flex-row mb-1.5 gap-2 items-center">
          {/* <MaterialCommunityIcons name="hand-coin" size={20} color={green600} /> */}
          <MaterialCommunityIcons
            name="account-clock-outline"
            size={22}
            color={green600}
          />
          <View className="flex-1 flex-row justify-between">
            <View className="flex flex-row gap-1">
              {order.map((i, k) => (
                <View key={k} className="flex-row items-center ">
                  <Text className="text-neutral-700">{i.name},</Text>
                  {/* <Feather name="x" size={15} color="black" />
                <Text className="text-neutral-700">
                  {i.quantity} {k !== order.length - 1 && ","}
                </Text> */}
                </View>
              ))}
            </View>

            {customer?.name ? (
              <View className="flex-row space-x-2 items-center">
                <MaterialCommunityIcons
                  name="account"
                  size={20}
                  color={"#fb923c"}
                />
                <Text className="text-neutral-700">{customer.name}</Text>
              </View>
            ) : null}
          </View>
        </View>
        {/* 
        {customer?.name ? (
          <View className="flex-row space-x-2 items-center">
            <MaterialCommunityIcons name="account" size={20} color={green600} />
            <Text className="text-neutral-700">{customer.name}</Text>
          </View>
        ) : null} */}
      </Pressable>

      <View className="flex-row gap-2 justify-between">
        {actionButtons.map((btn, idx) => (
          <Pressable
            key={idx}
            className={btn.className}
            onPress={() => handlePress(btn)}
            disabled={loading === btn.action}
          >
            <Text className={btn.textClassName}>
              {loading === btn.action ? "..." : btn.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default OrderItem;

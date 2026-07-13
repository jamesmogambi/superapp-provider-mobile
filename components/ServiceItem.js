import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import StatusBadge from "./StatusBadge";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { green600 } from "../constants/colors";
import { Switch } from "react-native-paper";
import RemoveServiceItemModal from "./RemoveServiceItemModal";
import { useNavigation } from "@react-navigation/native";

const ServiceItem = ({ item, onRemove, onToggleActive }) => {
  const { name, status, online } = item;

  const [isSwitchOn, setIsSwitchOn] = React.useState(online);
  const [showModal, setShowModal] = useState(false);

  const onToggleSwitch = () => {
    const next = !isSwitchOn;
    setIsSwitchOn(next);
    onToggleActive?.(item, next);
  };

  const navigation = useNavigation();
  return (
    <>
      <RemoveServiceItemModal
        isVisible={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false);
          onRemove?.(item);
        }}
      />
      <Pressable className="space-y-2.5">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-semibold">{name}</Text>
          <StatusBadge status={status} />
        </View>
        <View className="flex-row justify-between items-center">
          <View className="flex-row space-x-2.5">
            <Pressable
              onPress={() => navigation.navigate("Packages")}
              className="flex-row p-2 px-3 items-center border-[0.5px] rounded-3xl space-x-2"
            >
              <Ionicons name="eye" size={19} color={green600} />
              <Text className="tet-base">View Packages</Text>
            </Pressable>
            <Pressable
              onPress={() => setShowModal(true)}
              className="flex-row p-2 px-3 items-center border-[0.5px] rounded-3xl space-x-2"
            >
              <MaterialCommunityIcons
                name="delete-forever"
                size={19}
                color="red"
              />
              <Text className="tet-base">Remove</Text>
            </Pressable>
          </View>
          <Switch
            className="h-5"
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            color={green600}
          />
        </View>
      </Pressable>
    </>
  );
};

export default ServiceItem;

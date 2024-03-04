import { View, Text } from "react-native";
import React from "react";
import ModalComponent from "./ModalComponent";
import ButtonOutline from "./ButtonOutline";
import ButtonContained from "./ButtonContained";

const RemoveServiceItemModal = ({ isVisible, onCancel }) => {
  return (
    <ModalComponent isVisible={isVisible}>
      <View className="space-y-6">
        <Text className="text-lg text-center font-semibold">
          Remove Service
        </Text>
        <Text className="text-base text-center">
          Do you want to remove the Service?
        </Text>
        <View className="flex-row items-center justify-around pt-4">
          <View className="w-32">
            <ButtonOutline label={"No"} handlePress={onCancel} />
          </View>
          <View className="w-32">
            <ButtonContained label="Yes" onPress={() => {}} />
          </View>
        </View>
      </View>
    </ModalComponent>
  );
};

export default RemoveServiceItemModal;

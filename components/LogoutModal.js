import { View, Text } from "react-native";
import React from "react";
import ModalComponent from "./ModalComponent";
import ButtonOutline from "./ButtonOutline";
import ButtonContained from "./ButtonContained";

const LogoutModal = ({ isVisible, onCancel }) => {
  return (
    <ModalComponent isVisible={isVisible}>
      <View className="space-y-6">
        <Text className="text-lg text-center font-semibold">Logout</Text>
        <Text className="text-base text-center">
          Are You Sure you want to Logout?
        </Text>
        <View className="flex-row items-center justify-around pt-4">
          <View className="w-32">
            <ButtonOutline label={"Cancel"} handlePress={onCancel} />
          </View>
          <View className="w-32">
            <ButtonContained label="Logout" onPress={() => {}} />
          </View>
        </View>
      </View>
    </ModalComponent>
  );
};

export default LogoutModal;

import { View, Text, Modal } from "react-native";
import React from "react";

const ModalComponent = ({ isVisible, closeModal, children }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <View
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        className="flex-1 justify-center items-center "
      >
        <View className="bg-white rounded-3xl p-6  w-[90%]">{children}</View>
      </View>
    </Modal>
  );
};

export default ModalComponent;

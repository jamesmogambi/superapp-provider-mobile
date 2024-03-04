import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

const ActionSheet = ({ children, isVisible, onCancel }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onCancel}
    >
      {/* modal container */}
      <TouchableOpacity
        activeOpacity={1}
        onPressOut={onCancel}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        className="flex-1 justify-end"
      >
        {/* action sheet */}
        <TouchableWithoutFeedback>
          <View className="bg-white rounded-t-2xl">{children}</View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default ActionSheet;

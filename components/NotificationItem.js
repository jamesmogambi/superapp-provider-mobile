import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const NotificationItem = ({ notification }) => {
  const { id, title, description, date } = notification;
  return (
    <View className="flex-row py-3  items-start gap-3  ">
      <View>
        <MaterialIcons name="notifications-on" size={24} color="#737373" />
      </View>
      <View className="space-y-2 flex-1">
        <Text className="text-base text-neutral-700">{title}</Text>
        <Text className="text-base  text-neutral-400 ">{description}</Text>
        <Text className="text-sm text-neutral-400">{date}</Text>
      </View>
    </View>
  );
};

export default NotificationItem;

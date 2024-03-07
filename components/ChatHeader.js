import { View, Text, Image } from "react-native";
import React from "react";

const ChatHeader = () => {
  const profileImage = "https://mui.com/static/images/avatar/1.jpg";

  return (
    <View className="flex-row  gap-4 p-4">
      <Image
        className="h-[90px] w-[90px] rounded-xl"
        source={{
          uri: profileImage,
        }}
      />
      <Text className="text-lg font-medium pt-2">Admin</Text>
    </View>
  );
};

export default ChatHeader;

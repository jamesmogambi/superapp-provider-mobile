import { View, Text } from "react-native";
import React from "react";

const MessageItem = ({ chat, yourId }) => {
  const { message, timestamp, userId } = chat;

  return (
    <View>
      {yourId === userId ? (
        <View className="items-end">
          <Text className="border-[0.5px] p-2 flex-grow border-green-600 bg-green-100 rounded-xl rounded-br-none">
            {message}
          </Text>
          <Text className="text-gray-600 text-[12px]">{timestamp}</Text>
        </View>
      ) : (
        <View className="items-start">
          <Text className="border-[0.5px] p-2 border-slate-300    rounded-xl rounded-bl-none">
            {message}
          </Text>
          <Text className="text-gray-600 text-[12px]">{timestamp}</Text>
        </View>
      )}
    </View>
  );
};

export default MessageItem;

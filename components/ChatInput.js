import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

const ChatInput = ({ onSubmit }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    onSubmit(message);
  };
  return (
    <View className="flex-row justify-between px-3 pt-2  w-full border-t-[0.5px] border-neutral-300 ">
      <TextInput
        value={message}
        placeholder="Write a message here..."
        underlineColorAndroid="transparent"
        onChangeText={setMessage}
        multiline={true}
        className="flex-1 mr-3"
      />

      <Pressable
        onPress={handleSubmit}
        className="rounded-full h-10 w-10 bg-green-100 justify-center  items-center"
      >
        <MaterialIcons name="send" size={20} color="#16a34a" />
      </Pressable>
    </View>
  );
};

export default ChatInput;

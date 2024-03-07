import { View, Text, ScrollView, Image, FlatList } from "react-native";
import React from "react";
import Stack from "../components/Stack";
import ChatHeader from "../components/ChatHeader";
import { chats } from "../fixtures/chat";
import MessageItem from "../components/MessageItem";
import { Divider } from "react-native-paper";
import ChatInput from "../components/ChatInput";

const LiveChat = () => {
  const myId = 1;

  const onSubmit = (message) => {
    console.log("input message", message);
  };

  return (
    <Stack>
      <View className="flex-1 justify-between">
        <FlatList
          className=" border-purple-400 px-4"
          data={chats}
          ListHeaderComponent={
            <View className="mb-4">
              <ChatHeader />
              <Divider />
            </View>
          }
          renderItem={({ item }) => (
            <View className="mb-4">
              <MessageItem chat={item} yourId={myId} />
            </View>
          )}
          keyExtractor={(item, index) => item + index}
          showsVerticalScrollIndicator={false}
        />
        <ChatInput onSubmit={onSubmit} />
      </View>
    </Stack>
  );
};

export default LiveChat;

import { View, Text, FlatList } from "react-native";
import React from "react";
import Stack from "../components/Stack";
import UserChat from "../components/UserChat";
import { Divider } from "react-native-paper";

const chats = [
  {
    sender: "James",
    lastmessage: "Am delivering your item right now",
    image: "https://mui.com/static/images/avatar/1.jpg",
    timestamp: "19 Jan 2024 10:05 PM",
  },
  {
    sender: "James",
    lastmessage: "Am delivering your item right now",
    image: "https://mui.com/static/images/avatar/1.jpg",
    timestamp: "19 Jan 2024 10:05 PM",
  },
  {
    sender: "James",
    lastmessage: "Am delivering your item right now",
    image: "https://mui.com/static/images/avatar/1.jpg",
    timestamp: "19 Jan 2024 10:05 PM",
  },
  {
    sender: "James",
    lastmessage: "Am delivering your item right now",
    image: "https://mui.com/static/images/avatar/1.jpg",
    timestamp: "19 Jan 2024 10:05 PM",
  },
];
const Chats = () => {
  return (
    <Stack>
      <FlatList
        className=""
        data={chats}
        renderItem={({ item }) => (
          <View className="p-4">
            <UserChat user={item} />
          </View>
        )}
        keyExtractor={(item, index) => item + index}
        ItemSeparatorComponent={<Divider />}
        showsVerticalScrollIndicator={false}
      />
    </Stack>
  );
};

export default Chats;

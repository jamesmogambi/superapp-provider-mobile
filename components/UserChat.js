import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const UserChat = ({ user }) => {
  let { image, userId, sender, lastmessage, timestamp } = user;
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate("LiveChat")}
      className="flex flex-row justify-between items-center "
    >
      <View className="flex-row items-center gap-4">
        <Image
          className="h-[90px] w-[90px] rounded-xl"
          source={{
            uri: image,
          }}
        />
        <View className="space-y-2">
          <Text className="text-lg font-medium">{sender}</Text>
          <View className="">
            <Text
              numberOfLines={1}
              className="text-gray-600  w-56  truncate text-base"
            >
              {lastmessage}
            </Text>
            <Text className="italic text-light text-gray-400">{timestamp}</Text>
          </View>
        </View>
      </View>
      <Pressable>
        <MaterialCommunityIcons name="trash-can" size={26} color="red" />
      </Pressable>
    </Pressable>
  );
};

export default UserChat;

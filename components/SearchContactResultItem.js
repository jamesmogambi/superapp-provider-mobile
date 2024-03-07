import { View, Text, Pressable, Image } from "react-native";
import React from "react";

const SearchContactResultItem = ({ user }) => {
  const { image, name, contact, role } = user;

  return (
    <Pressable className="flex-row gap-5">
      <View>
        <Image
          className="h-[80px] w-[80px] rounded-xl "
          source={{ uri: image }}
        />
      </View>
      <View className="justify-between">
        <View className="flex-row items-center gap-2 ">
          <Text className="text-lg">{name}</Text>
          <Text className="text-base text-neutral-400 font-light italic ">
            ({role})
          </Text>
        </View>
        <Text className="text-base">{contact}</Text>
      </View>
    </Pressable>
  );
};

export default SearchContactResultItem;

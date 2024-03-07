import { View, Text, Pressable, FlatList } from "react-native";
import React from "react";
import Stack from "../components/Stack";
import { Divider } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

const items = [
  "Contact us",
  "FAQ",
  "Disclaimer",
  "Privacy Policy",
  "Terms and Conditions",
];
const Support = ({ navigation }) => {
  return (
    <Stack>
      <FlatList
        data={items}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("SupportDetail", { name: item })}
            className="p-4 py-5 flex flex-row items-center justify-between  "
          >
            <View className="flex-row items-center">
              <Text className="text-lg text-neutral-600 tracking-wide">
                {item}
              </Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="#525252"
            />
          </Pressable>
        )}
        keyExtractor={(item, index) => item + index}
        ItemSeparatorComponent={<Divider />}
      />
    </Stack>
  );
};

export default Support;

import { View, Text, SectionList } from "react-native";
import React from "react";
import Stack from "../components/Stack";
import { Divider } from "react-native-paper";
import DocumentItem from "../components/DocumentItem";

const DATA = [
  {
    title: "Tutors",
    data: [
      {
        name: "ID Card",
        status: "Pending",
        image: require("../assets/images/user.jpg"),
      },
      {
        name: "Professional Card",
        status: "Pending",
        image: require("../assets/images/code.png"),
      },
    ],
  },
  {
    title: "Beauty Service",
    data: [
      {
        name: "Professional Card",
        status: "No Document",
        image: require("../assets/images/user.jpg"),
      },
    ],
  },
];
const Document = () => {
  return (
    <Stack>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View className="p-3">
            <DocumentItem item={item} />
          </View>
        )}
        ItemSeparatorComponent={() => <Divider />}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-lg font-semibold text-neutral-700 ml-3">
            {title}
          </Text>
        )}
      />
    </Stack>
  );
};

export default Document;

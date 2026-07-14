import { View, Text, SectionList } from "react-native";
import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";
import Stack from "../components/Stack";
import { Divider } from "react-native-paper";
import DocumentItem from "../components/DocumentItem";
import { useDocumentStore } from "../store/documentStore";

const CATEGORIES = [
  {
    title: "ID Card",
    data: [
      {
        name: "ID Card",
        docType: "id_card",
        placeholderImage: require("../assets/images/user.jpg"),
      },
    ],
  },
  {
    title: "Professional Documents & Licenses",
    data: [
      {
        name: "Professional Card",
        docType: "professional",
        placeholderImage: require("../assets/images/code.png"),
      },
      {
        name: "License",
        docType: "professional",
        placeholderImage: require("../assets/images/user.jpg"),
      },
    ],
  },
];

const Document = () => {
  const { user } = useUser();
  const userId = user?.id;
  const { loadDocuments } = useDocumentStore();

  useEffect(() => {
    if (userId) {
      loadDocuments(userId);
    }
  }, [userId]);

  return (
    <Stack>
      <SectionList
        sections={CATEGORIES}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => (
          <View className="p-3">
            <DocumentItem
              docType={item.docType}
              name={item.name}
              placeholderImage={item.placeholderImage}
            />
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

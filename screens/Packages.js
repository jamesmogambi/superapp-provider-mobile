import { View, Text, SectionList } from "react-native";
import React from "react";
import Stack from "../components/Stack";
import { Divider } from "react-native-paper";
import { packages } from "../fixtures/service";
import PackageItem from "../components/PackageItem";

const Packages = () => {
  return (
    <Stack>
      <SectionList
        className="p-3"
        sections={packages}
        keyExtractor={(item, index) => item + index}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <View className="pb-3 pt-2">
            <PackageItem item={item} />
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-base font-bold text-neutral-700 ">{title}</Text>
        )}
      />
    </Stack>
  );
};

export default Packages;

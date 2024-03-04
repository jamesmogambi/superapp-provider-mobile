import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import Stack from "../components/Stack";
import { services } from "../fixtures/service";
import { Divider } from "react-native-paper";
import ServiceItem from "../components/ServiceItem";
import ButtonContained from "../components/ButtonContained";
import SelectServiceActionSheet from "../components/SelectServiceActionSheet";

const Services = () => {
  const [showActionsheet, setShowActionsheet] = useState(false);
  return (
    <Stack>
      <SelectServiceActionSheet
        isVisible={showActionsheet}
        onCancel={() => setShowActionsheet(false)}
      />
      <View className="flex-1 justify-between">
        <FlatList
          data={services}
          renderItem={({ item, index }) => (
            <View className="p-4">
              <ServiceItem item={item} />
            </View>
          )}
          keyExtractor={(item, index) => item + index}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={<Divider />}
        />
        <View className="p-4">
          <ButtonContained
            label={"Add Service"}
            handlePress={() => setShowActionsheet(true)}
          />
        </View>
      </View>
    </Stack>
  );
};

export default Services;

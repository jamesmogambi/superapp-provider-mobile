import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Stack from "../components/Stack";
import { services as fixturesServices } from "../fixtures/service";
import { Divider } from "react-native-paper";
import ServiceItem from "../components/ServiceItem";
import ButtonContained from "../components/ButtonContained";
import SelectServiceActionSheet from "../components/SelectServiceActionSheet";
import { useServicesStore } from "../store/servicesStore";

const Services = () => {
  const [showActionsheet, setShowActionsheet] = useState(false);
  const services = useServicesStore((state) => state.services);
  const fetchServices = useServicesStore((state) => state.fetchServices);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return (
    <Stack>
      <SelectServiceActionSheet
        isVisible={showActionsheet}
        onCancel={() => setShowActionsheet(false)}
      />
      <SafeAreaView className="flex-1" edges={["bottom"]}>
        <View className="flex-1 justify-between">
          <FlatList
            data={services.length > 0 ? services : fixturesServices}
            renderItem={({ item, index }) => (
              <View className="p-4">
                <ServiceItem item={item} />
              </View>
            )}
            keyExtractor={(item, index) => item.id || item.name + index}
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
      </SafeAreaView>
    </Stack>
  );
};

export default Services;

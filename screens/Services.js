import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Stack from "../components/Stack";
import { services as fixturesServices } from "../fixtures/service";
import { Divider } from "react-native-paper";
import ServiceItem from "../components/ServiceItem";
import ButtonContained from "../components/ButtonContained";
import SelectServiceActionSheet from "../components/SelectServiceActionSheet";
import { getUserServices, getProviderServices } from "../services/service";
import { useUser } from "@clerk/clerk-expo";

const Services = () => {
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [userServices, setUserServices] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const [userData, availableData] = await Promise.all([
          user?.id ? getUserServices(user.id) : [],
          getProviderServices(),
        ]);
        if (active) {
          setUserServices(userData);
          setAvailableServices(availableData);
        }
      } catch {
        // keep defaults on error
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    if (isLoaded) {
      load();
    }

    return () => {
      active = false;
    };
  }, [user?.id, isLoaded]);

  const services = userServices.length > 0 ? userServices : fixturesServices;

  return (
    <Stack>
      <SelectServiceActionSheet
        isVisible={showActionsheet}
        onCancel={() => setShowActionsheet(false)}
        services={availableServices}
      />
      <SafeAreaView className="flex-1" edges={["bottom"]}>
        <View className="flex-1 justify-between">
          <FlatList
            data={services}
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

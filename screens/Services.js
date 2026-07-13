import { View, Text, FlatList, Alert, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Stack from "../components/Stack";
import { Divider } from "react-native-paper";
import ServiceItem from "../components/ServiceItem";
import ButtonContained from "../components/ButtonContained";
import SelectServiceActionSheet from "../components/SelectServiceActionSheet";
import { getUserServices, addUserServices, deleteUserService, updateUserService } from "../services/service";
import { useUser } from "@clerk/clerk-expo";
import { useServicesStore } from "../store/servicesStore";
import { green600 } from "../constants/colors";

const Services = () => {
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [userServices, setUserServices] = useState([]);
  const [saving, setSaving] = useState(false);
  const availableServices = useServicesStore((s) => s.services);
  const fetchServices = useServicesStore((s) => s.fetchServices);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const userData = user?.id ? await getUserServices(user.id) : [];
        if (active) {
          setUserServices(userData);
        }
      } catch {
        // keep defaults on error
      }
    };

    if (isLoaded) {
      load();
    }

    return () => {
      active = false;
    };
  }, [user?.id, isLoaded]);

  const services = userServices;

  const ownedServiceNames = new Set(userServices.map((s) => s.name));
  const selectableServices = availableServices.filter(
    (s) => !ownedServiceNames.has(s.name)
  );

  const handleDone = async (selectedServices) => {
    setShowActionsheet(false);
    setSaving(true);
    try {
      const created = await addUserServices(user.id, selectedServices);
      useServicesStore.getState().addServices(created);
      const updated = await getUserServices(user.id);
      setUserServices(updated);
    } catch {
      Alert.alert("Error", "Failed to add services. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async (service) => {
    if (!service?.id) return;
    setSaving(true);
    try {
      await deleteUserService(service.id);
      setUserServices((prev) => prev.filter((s) => s.id !== service.id));
    } catch {
      Alert.alert("Error", "Failed to remove service. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (service, active) => {
    if (!service?.id) return;
    try {
      await updateUserService(service.id, { online: active });
      setUserServices((prev) =>
        prev.map((s) => (s.id === service.id ? { ...s, online: active } : s))
      );
    } catch {
      Alert.alert("Error", "Failed to update service. Please try again.");
    }
  };

  return (
    <Stack>
      <SelectServiceActionSheet
        isVisible={showActionsheet}
        onCancel={() => setShowActionsheet(false)}
        services={selectableServices}
        onDone={handleDone}
      />
      <SafeAreaView className="flex-1" edges={["bottom"]}>
        <View className="flex-1 justify-between">
          {saving ? (
            <View className="flex-1 justify-center items-center px-8">
              <ActivityIndicator size="large" color={green600} />
              <Text className="mt-3 text-base text-neutral-600 text-center">
                Updating your services…
              </Text>
            </View>
          ) : services.length === 0 ? (
            <View className="flex-1 justify-center items-center px-8">
              <Text className="text-base text-neutral-500 text-center">
                You haven't added any services yet. Tap "Add Service" to get
                started.
              </Text>
            </View>
          ) : (
              <FlatList
                data={services}
                renderItem={({ item, index }) => (
                  <View className="p-4">
                    <ServiceItem item={item} onRemove={handleRemove} onToggleActive={handleToggle} />
                  </View>
                )}
              keyExtractor={(item, index) => item.id || item.name + index}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={<Divider />}
            />
          )}
          <View className="p-4">
            <ButtonContained
              label={"Add Service"}
              disabled={saving}
              handlePress={() => setShowActionsheet(true)}
            />
          </View>
        </View>
      </SafeAreaView>
    </Stack>
  );
};

export default Services;

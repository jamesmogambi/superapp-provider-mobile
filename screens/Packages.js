import { View, Text, FlatList, ActivityIndicator, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Stack from "../components/Stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider } from "react-native-paper";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useUser } from "@clerk/clerk-expo";
import { Feather } from "@expo/vector-icons";
import { green600 } from "../constants/colors";
import PackageItem from "../components/PackageItem";
import ButtonContained from "../components/ButtonContained";
import { getPackages } from "../services/service";

const Packages = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { service } = route.params || {};
  const { user } = useUser();

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (service?.name) {
      navigation.setOptions({ title: service.name });
    }
  }, [navigation, service?.name]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          onPress={() => navigation.navigate("Services")}
          className="px-3"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Feather name="arrow-left" size={24} color="black" />
        </Pressable>
      ),
    });
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      let active = true;
      const load = async () => {
        if (!user?.id || !service?.id) {
          setLoading(false);
          return;
        }
        try {
          const data = await getPackages(user.id, service.id);
          if (active) setPackages(data);
        } catch {
          // keep empty on error
        } finally {
          if (active) setLoading(false);
        }
      };
      load();
      return () => {
        active = false;
      };
    }, [user?.id, service?.id])
  );

  const refresh = async () => {
    if (!user?.id || !service?.id) return;
    const data = await getPackages(user.id, service.id);
    setPackages(data);
  };

  if (loading) {
    return (
      <Stack>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={green600} />
          <Text className="mt-3 text-base text-neutral-600 text-center">
            Loading packages…
          </Text>
        </View>
      </Stack>
    );
  }

  return (
    <Stack>
      <SafeAreaView className="flex-1" edges={["bottom"]}>
        <View className="flex-1 justify-between">
          {packages.length === 0 ? (
            <View className="flex-1 justify-center items-center px-8">
              <Text className="text-base text-neutral-500 text-center">
                No packages yet for this service. Tap "Add Package" to create one.
              </Text>
            </View>
          ) : (
            <FlatList
              className="p-3"
              data={packages}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <Divider />}
              renderItem={({ item }) => (
                <View className="pb-3 pt-2">
                  <PackageItem item={item} service={service} onChange={refresh} />
                </View>
              )}
            />
          )}
          <View className="p-4">
            <ButtonContained
              label={"Add Package"}
              handlePress={() =>
                navigation.navigate("AddPackage", { service })
              }
            />
          </View>
        </View>
      </SafeAreaView>
    </Stack>
  );
};

export default Packages;

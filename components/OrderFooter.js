import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Surface, Switch } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { green600 } from "../constants/colors";
import { useUser } from "@clerk/clerk-expo";
import {
  getProviderProfile,
  updateProviderOnlineStatus,
} from "../services/profile";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const OrderFooter = () => {
  const { user, isLoaded } = useUser();
  const insets = useSafeAreaInsets();
  const [profile, setProfile] = useState(null);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      if (!user?.id) return;
      try {
        const data = await getProviderProfile(user.id);
        if (active) {
          setProfile(data || null);
          if (data?.online !== undefined) {
            setIsSwitchOn(data.online);
          }
        }
      } catch {
        // keep defaults on error
      }
    };

    if (isLoaded) {
      loadProfile();
    }

    return () => {
      active = false;
    };
  }, [user?.id, isLoaded]);

  const onToggleSwitch = async () => {
    const next = !isSwitchOn;
    setIsSwitchOn(next);
    setLoading(true);
    try {
      await updateProviderOnlineStatus(user.id, next);
      if (profile) {
        setProfile({ ...profile, online: next });
      }
    } catch {
      setIsSwitchOn(!next);
    } finally {
      setLoading(false);
    }
  };

  const name = profile?.fullName || user?.fullName || "";
  const imageUri = profile?.imageUrl || user?.imageUrl || "";
  const services = profile?.services || [];
  const online = isSwitchOn;
  const distance = profile?.distance || "";

  return (
    <Surface
      elevation={5}
      className="bg-white "
      style={{ paddingBottom: Math.max(insets.bottom, 12) }}
    >
      <View className="">
        <View className="flex-row justify-between items-center">
          <View className="flex-row gap-3 p-2 pb-0 items-center">
            <Image
              source={{ uri: imageUri }}
              className="rounded-xl h-14 w-14"
            />
            <View className="">
              <Text className="text-base font-medium">{name}</Text>
              <View className="flex-row space-x-2 items-center">
                <Entypo name="location" size={16} color={green600} />
                <Text>{distance}</Text>
              </View>
            </View>
          </View>
          <View className="flex-row space-x-2 items-center">
            <Text
              className={`${
                online ? "text-green-600" : "text-red-500"
              } text-base font-medium`}
            >
              {online ? "Online" : "Offline"}
            </Text>
            <Switch
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
              color={green600}
              disabled={loading}
            />
          </View>
        </View>
        <Text>
          {services.map((i, k) => `${i}${k !== services.length - 1 && ", "}`)}
        </Text>
      </View>
    </Surface>
  );
};

export default OrderFooter;

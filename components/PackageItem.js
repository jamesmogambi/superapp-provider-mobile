import { View, Text, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { green600 } from "../constants/colors";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Switch } from "react-native-paper";
import ModalComponent from "./ModalComponent";
import ButtonOutline from "./ButtonOutline";
import ButtonContained from "./ButtonContained";
import { useNavigation } from "@react-navigation/native";
import { updatePackage, deletePackage } from "../services/service";

const PackageItem = ({ item, service, onChange }) => {
  const { name, cost, online } = item;

  const [isSwitchOn, setIsSwitchOn] = useState(online);
  const [showModal, setShowModal] = useState(false);

  const navigation = useNavigation();

  const onToggleSwitch = async () => {
    const next = !isSwitchOn;
    setIsSwitchOn(next);
    try {
      await updatePackage(item.id, { online: next });
      onChange?.();
    } catch {
      setIsSwitchOn(!next);
      Alert.alert("Error", "Failed to update package. Please try again.");
    }
  };

  const handleRemove = async () => {
    setShowModal(false);
    try {
      await deletePackage(item.id);
      onChange?.();
    } catch {
      Alert.alert("Error", "Failed to remove package. Please try again.");
    }
  };

  return (
    <>
      <ModalComponent isVisible={showModal}>
        <View className="space-y-6">
          <Text className="text-lg text-center font-semibold">
            Remove Package
          </Text>
          <Text className="text-base text-center">
            Do you want to remove the Package?
          </Text>
          <View className="flex-row items-center justify-around pt-4">
            <View className="w-32">
              <ButtonOutline
                label={"No"}
                handlePress={() => setShowModal(false)}
              />
            </View>
            <View className="w-32">
              <ButtonContained label="Yes" handlePress={handleRemove} />
            </View>
          </View>
        </View>
      </ModalComponent>
      <View className=" space-y-2">
        <View className="flex-row justify-between items-center">
          <Text className="text-base text-neutral-500">{name}</Text>
          <Switch
            className="h-6"
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            color={green600}
          />
        </View>
        <View className="flex-row justify-between items-center">
          <View className="flex-row gap-3">
            <Pressable
              onPress={() =>
                navigation.navigate("AddPackage", {
                  service,
                  packageItem: item,
                })
              }
              className="flex-row p-2 px-3 items-center border-[0.5px] rounded-3xl space-x-2"
            >
              <MaterialIcons
                name="mode-edit-outline"
                size={19}
                color={green600}
              />
              <Text className="">Edit</Text>
            </Pressable>
            <Pressable
              onPress={() => setShowModal(true)}
              className="flex-row p-2 px-3 items-center border-[0.5px] rounded-3xl space-x-2"
            >
              <MaterialCommunityIcons
                name="trash-can"
                size={19}
                color={"red"}
              />
              <Text className="">Remove</Text>
            </Pressable>
          </View>
          <Text className="text-base font-semibold">Ksh {cost}</Text>
        </View>
      </View>
    </>
  );
};

export default PackageItem;

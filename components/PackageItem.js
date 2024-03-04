import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { green600 } from "../constants/colors";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Switch } from "react-native-paper";
import ModalComponent from "./ModalComponent";
import ButtonOutline from "./ButtonOutline";
import ButtonContained from "./ButtonContained";
import { useNavigation } from "@react-navigation/native";

const PackageItem = ({ item }) => {
  const { name, cost, online } = item;

  const [isSwitchOn, setIsSwitchOn] = useState(online);
  const [showModal, setShowModal] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const navigation = useNavigation();
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
              <ButtonContained label="Yes" onPress={() => {}} />
            </View>
          </View>
        </View>
      </ModalComponent>
      <View className=" space-y-2">
        <View className="flex-row justify-between items-center">
          <Text className="text-base text-neutral-500">{name}</Text>
          <Switch
            className="h-6"
            value={online}
            onValueChange={onToggleSwitch}
            color={green600}
          />
        </View>
        <View className="flex-row justify-between items-center">
          <View className="flex-row space-x-2.5">
            <Pressable
              onPress={() => navigation.navigate("AddPackage")}
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

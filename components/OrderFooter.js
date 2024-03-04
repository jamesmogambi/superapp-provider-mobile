import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { Surface, Switch } from "react-native-paper";
import { provider } from "../fixtures/provider";
import { Entypo } from "@expo/vector-icons";
import { green600 } from "../constants/colors";

const OrderFooter = () => {
  const { name, image, services, online, distance } = provider;

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <Surface elevation={5} className="bg-white p-4 ">
      <View>
        <View className="flex-row justify-between items-center">
          <View className="flex-row space-x-3 items-center">
            <Image source={image} className="rounded-xl h-14 w-14" />
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

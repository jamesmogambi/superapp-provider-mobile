import { View, Text, ScrollView, Pressable, FlatList } from "react-native";
import React, { useState } from "react";
import { days, slots } from "../fixtures/slot";
import { Switch } from "react-native-paper";
import { green600 } from "../constants/colors";
import ButtonContained from "./ButtonContained";

const SelectSlot = () => {
  const [date, setDate] = useState(days[0]);
  const [timeSlot, setTimeSlot] = useState("");
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View className="flex-1 space-y-2  ">
      <View className="gap-2 pt-3 ">
        <Text className="text-lg font-semibold pl-3 ">Select a day</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-4 px-2">
            {days.map((i, k) => (
              <Pressable
                key={k}
                onPress={() => setDate(i)}
                className={`${
                  date === i && "bg-green-50 border-green-600"
                }  border-[0.5px] rounded-xl justify-center items-center h-12 w-12`}
              >
                <Text>{i}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
      <View className="gap-2  px-2 flex-1">
        <View className="flex-row justify-between">
          <Text className="text-lg font-semibold">
            Select Your Service time slot
          </Text>
          <View className="flex-row items-center  ">
            <Text>All</Text>
            <Text className="text-green-600 ml-1">
              {isSwitchOn ? "On" : "Off"}
            </Text>
            <Switch
              color={green600}
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
              className="h-5"
            />
          </View>
        </View>

        <View className="pb-5">
          <FlatList
            columnWrapperStyle={{ justifyContent: "space-between" }}
            numColumns={2}
            data={slots}
            renderItem={({ item, index }) => (
              <View className="w-44">
                {item.available ? (
                  <Pressable
                    onPress={() => setTimeSlot(item.slot)}
                    className={`${
                      timeSlot === item.slot && "bg-green-50 border-green-600"
                    } border-[0.5px] px-2 py-3 rounded-lg mb-4 items-center`}
                  >
                    <Text className="text-base text-neutral-600 uppercase">
                      {item.slot}
                    </Text>
                  </Pressable>
                ) : (
                  <View className="bg-neutral-100 px-2 py-3 mb-4 rounded-lg items-center">
                    <Text className="text-base text-neutral-600 uppercase">
                      {item.slot}
                    </Text>
                  </View>
                )}
              </View>
            )}
            keyExtractor={(item, index) => item + index}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>

      <View className="p-3">
        <ButtonContained label={"Update"} />
      </View>
    </View>
  );
};

export default SelectSlot;

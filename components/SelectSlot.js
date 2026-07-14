import {
  View,
  Text,
  ScrollView,
  Pressable,
  FlatList,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/clerk-expo";
import { Switch } from "react-native-paper";
import { green600 } from "../constants/colors";
import ButtonContained from "./ButtonContained";
import { getAvailability, saveAvailability } from "../services/service";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const formatHour = (hour) => {
  const period = hour >= 12 ? "PM" : "AM";
  let display = hour % 12;
  if (display === 0) display = 12;
  return `${String(display).padStart(2, "0")}:00 ${period}`;
};

const generateSlots = (start = 6, end = 22) => {
  const result = [];
  for (let h = start; h < end; h++) {
    result.push(`${formatHour(h)} - ${formatHour(h + 1)}`);
  }
  return result;
};

const slots = generateSlots();

const SelectSlot = () => {
  const { user } = useUser();

  const [date, setDate] = useState(days[0]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    const load = async () => {
      if (!user?.id) return;
      try {
        const saved = await getAvailability(user.id, date);
        if (active) setSelectedSlots(saved);
      } catch {
        // keep current on error
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [user?.id, date]);

  const allOn = slots.length > 0 && selectedSlots.length === slots.length;

  const toggleSlot = (slot) => {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const toggleAll = () => {
    setSelectedSlots(allOn ? [] : [...slots]);
  };

  const handleUpdate = async () => {
    if (!user?.id) return;
    setSaving(true);
    try {
      await saveAvailability(user.id, date, selectedSlots);
      Alert.alert("Saved", `Availability for ${date} has been updated.`);
    } catch {
      Alert.alert("Error", "Failed to save availability. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <View className="flex-1 space-y-2">
      <View className="gap-2 pt-3">
        <Text className="text-lg font-semibold pl-3">Select a day</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-4 px-2">
            {days.map((i, k) => (
              <Pressable
                key={k}
                onPress={() => setDate(i)}
                className={`${
                  date === i
                    ? "bg-green-50 border-green-600"
                    : "border-neutral-300"
                } border-[0.5px] rounded-xl justify-center items-center h-12 w-12`}
              >
                <Text
                  className={date === i ? "text-green-700" : "text-neutral-600"}
                >
                  {i}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
      <View className="gap-2 px-2 flex-1">
        <View className="flex-row justify-between">
          <Text className="text-lg font-semibold">
            Select Your Service time slot
          </Text>
          <View className="flex-row items-center">
            <Text>All</Text>
            <Text className="text-green-600 ml-1">{allOn ? "On" : "Off"}</Text>
            <Switch
              color={green600}
              value={allOn}
              onValueChange={toggleAll}
              className="h-5"
            />
          </View>
        </View>

        <View className="pb-5">
          <FlatList
            columnWrapperStyle={{ justifyContent: "space-between" }}
            numColumns={2}
            data={slots}
            renderItem={({ item }) => {
              const isSelected = selectedSlots.includes(item);
              return (
                <View className="w-44">
                  <Pressable
                    onPress={() => toggleSlot(item)}
                    className={`${
                      isSelected
                        ? "bg-green-600 border-green-600"
                        : "bg-white border-neutral-300"
                    } border-[0.5px] px-2 py-3 rounded-lg mb-4 items-center`}
                  >
                    <Text
                      className={`text-base uppercase ${
                        isSelected ? "text-white" : "text-neutral-600"
                      }`}
                    >
                      {item}
                    </Text>
                  </Pressable>
                </View>
              );
            }}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>

      <SafeAreaView edges={["bottom"]}>
        <View className="p-3">
          <ButtonContained
            label={"Update"}
            disabled={saving}
            handlePress={handleUpdate}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SelectSlot;

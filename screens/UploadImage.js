import { View, Text } from "react-native";
import React, { useState } from "react";
import Stack from "../components/Stack";
import Chips from "../components/Chips";
import UploadImageSection from "../components/UploadImageSection";

const options = [
  { name: "Tutor" },
  { name: "Beauty" },
  { name: "Home Cleaning" },
];
const UploadImage = () => {
  const [selectedOption, setSelectedOption] = useState(options[0].name);

  const handlePressChip = (param) => {
    setSelectedOption(param);
  };
  return (
    <Stack>
      <View className="flex-1 p-4">
        <View className="space-y-3">
          <View>
            <Text className="text-lg font-semibold">
              Upload Your Work Images
            </Text>
            <Text className="text-sm text-neutral-500">
              (Max 9 Images, 1:1 Ratio)
            </Text>
          </View>

          <Text className="text-base font-medium">
            Make sure the images you upload should be yours and read. It is
            necessary to upload images only regarding your work
          </Text>
        </View>
        <View className="py-3">
          <Chips
            handlePressChip={handlePressChip}
            selectedOption={selectedOption}
            options={options}
          />
        </View>
        <View className="py-2">
          <UploadImageSection />
        </View>
      </View>
    </Stack>
  );
};

export default UploadImage;

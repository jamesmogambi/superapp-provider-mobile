import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";
import Stack from "../components/Stack";
import UploadImageSection from "../components/UploadImageSection";
import ButtonContained from "../components/ButtonContained";
import { useUploadStore } from "../store/uploadStore";

const UploadImage = () => {
  const { user } = useUser();
  const userId = user?.id;
  const { images, uploading, error, loadImages, addImage, removeImage } =
    useUploadStore();

  useEffect(() => {
    if (userId) {
      loadImages(userId);
    }
  }, [userId]);

  const handleSubmit = () => {
    if (images.length === 0) {
      return;
    }
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
        <View className="py-2">
          <UploadImageSection
            images={images}
            uploading={uploading}
            onPickImage={(uri) => addImage(userId, uri)}
            onRemoveImage={(id) => removeImage(id)}
          />
        </View>
        {error && <Text className="text-red-500 text-sm mt-2">{error}</Text>}
        <View className="mt-4">
          <ButtonContained
            label="Submit"
            handlePress={handleSubmit}
            disabled={uploading || images.length === 0}
          />
        </View>
      </View>
    </Stack>
  );
};

export default UploadImage;

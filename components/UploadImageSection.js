import {
  View,
  Text,
  ImageBackground,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { green600 } from "../constants/colors";

const UploadImageSection = ({
  images = [],
  uploading = false,
  onPickImage,
  onRemoveImage,
}) => {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      onPickImage?.(result.assets[0].uri);
    }
  };

  return (
    <ScrollView>
      <View className="flex-row flex-wrap justify-start">
        {images.map((i) => (
          <View key={i.id} className="h-32 w-1/3 p-2 relative">
            <Pressable
              onPress={() => onRemoveImage?.(i.id)}
              className="absolute top-1 right-1 z-40 bg-red-500 rounded-full h-5 w-5 items-center justify-center"
            >
              <Feather name="x" size={16} color="white" />
            </Pressable>
            <ImageBackground
              className="flex-1 rounded-xl overflow-hidden"
              source={{ uri: i.url }}
            >
              {i.uploading && (
                <View className="flex-1 items-center justify-center bg-black/30">
                  <ActivityIndicator size="small" color="white" />
                </View>
              )}
            </ImageBackground>
          </View>
        ))}
        {images.length < 9 && !uploading && (
          <View className="h-32 w-1/3 p-2">
            <Pressable
              onPress={pickImage}
              className="border border-dashed justify-center border-neutral-400 flex-1"
            >
              <View className="items-center">
                <FontAwesome5 name="file-upload" size={30} color={green600} />
                <Text className="text-base font-medium text-neutral-700 mt-2">
                  Add Image
                </Text>
              </View>
            </Pressable>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default UploadImageSection;

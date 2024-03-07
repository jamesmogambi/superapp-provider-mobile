import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { Surface } from "react-native-paper";
import ButtonContained from "./ButtonContained";
import * as ImagePicker from "expo-image-picker";

const DocumentItem = ({ item }) => {
  const { name, status, image } = item;
  const [documentImage, setImage] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View className="flex-row space-x-3">
      <Surface elevation={2} className="bg-white w-28 h-28 p-1  rounded-lg">
        <Image source={image} className="w-full h-full rounded-lg " />
      </Surface>
      <View className="flex-1">
        <View>
          <Text className="text-lg font-semibold text-neutral-700">{name}</Text>
          <View className="flex-row items-center">
            <Text className="text-base text-neutral-500 font-medium">
              Status :{" "}
            </Text>
            <Text
              className={`${status === "Pending" && "text-yellow-600"} ${
                status === "No Document" && "text-red-500"
              } text-base font-medium`}
            >
              {status}
            </Text>
          </View>
        </View>
        <View className="flex-row justify-end ">
          <View className="w-32">
            <ButtonContained label={"Upload"} handlePress={pickImage} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default DocumentItem;

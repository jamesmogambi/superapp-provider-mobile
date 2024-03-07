import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons, Feather, FontAwesome5 } from "@expo/vector-icons";
import { green600 } from "../constants/colors";
import ModalComponent from "./ModalComponent";
import ButtonOutline from "./ButtonOutline";
import ButtonContained from "./ButtonContained";

const images = [
  {
    id: "jcccgcgcgg",
    path: "https://mui.com/static/images/avatar/1.jpg",
  },
  {
    id: "jcccgcgcgg",
    path: "https://mui.com/static/images/avatar/1.jpg",
  },
  {
    id: "jcccgcgcgg",
    path: "https://mui.com/static/images/avatar/1.jpg",
  },
  {
    id: "jcccgcgcgg",
    path: "https://mui.com/static/images/avatar/1.jpg",
  },
  {
    id: "jcccgcgcgg",
    path: "https://legacy.reactjs.org/logo-og.png",
  },
  {
    id: "jcccgcgcgg",
    path: "https://legacy.reactjs.org/logo-og.png",
  },
];

const UploadImageSection = () => {
  const [showModal, setShowModal] = useState(false);

  const pickImage = async (handleChange) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      handleChange("image", result.assets[0].uri);
    }
  };
  return (
    <>
      <ModalComponent isVisible={showModal}>
        <View className="space-y-6">
          <Text className="text-lg text-center font-semibold">
            Delete Image
          </Text>
          <Text className="text-base text-center">
            Are You Sure Want to Delete This Image?
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
      <ScrollView>
        <View className="flex-row flex-wrap justify-start">
          {images.map((i, k) => (
            <View key={k} className="h-32 w-1/3 p-2 relative ">
              <Pressable
                onPress={() => setShowModal(true)}
                className="absolute top-1 right-1 z-40 bg-red-500 rounded-full h-5 w-5 items-center justify-center "
              >
                <Feather name="x" size={16} color="white" />
              </Pressable>

              <ImageBackground
                className="flex-1 rounded-xl overflow-hidden  "
                source={{ uri: i.path }}
              ></ImageBackground>
            </View>
          ))}
          <View className="h-32 w-1/3 p-2  ">
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
        </View>
      </ScrollView>
    </>
  );
};

export default UploadImageSection;

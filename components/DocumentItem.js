import { View, Text, Image } from "react-native";
import React from "react";
import { Surface } from "react-native-paper";
import ButtonContained from "./ButtonContained";
import * as ImagePicker from "expo-image-picker";
import { useDocumentStore } from "../store/documentStore";
import { useUser } from "@clerk/clerk-expo";
import { MaterialIcons } from "@expo/vector-icons";

const DocumentItem = ({ docType, name, placeholderImage }) => {
  const { user } = useUser();
  const userId = user?.id;
  const { documents, uploading, uploadDocument, removeDocument } =
    useDocumentStore();
  const existingDoc = documents.find(
    (d) => d.docType === docType && !d.uploading,
  );

  const displayImage = existingDoc?.url || placeholderImage;
  const status = existingDoc?.status || "No Document";
  const isUploading = documents.some(
    (d) => d.docType === docType && d.uploading,
  );
  const imageSource = existingDoc?.url ? { uri: displayImage } : displayImage;
  const isPdf = existingDoc?.fileType === "pdf";

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      try {
        await uploadDocument(userId, docType, name, result.assets[0].uri);
      } catch (err) {
        console.error("Upload failed", err);
      }
    }
  };

  const handleDelete = async () => {
    if (existingDoc?.id) {
      await removeDocument(existingDoc.id);
    }
  };

  return (
    <View className="flex-row gap-4">
      <Surface
        elevation={2}
        className="bg-white w-28 h-28 p-1 rounded-lg items-center justify-center"
      >
        {isPdf ? (
          <MaterialIcons name="picture-as-pdf" size={48} color="#dc2626" />
        ) : (
          <Image source={imageSource} className="w-full h-full rounded-lg" />
        )}
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
        <View className="flex-row justify-end gap-2">
          {existingDoc && (
            <View className="w-28">
              <ButtonContained
                label={"Delete"}
                handlePress={handleDelete}
                btnColor="#dc2626"
              />
            </View>
          )}
          <View className="">
            <ButtonContained
              label={isUploading ? "..." : "Upload"}
              handlePress={pickImage}
              disabled={isUploading}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default DocumentItem;

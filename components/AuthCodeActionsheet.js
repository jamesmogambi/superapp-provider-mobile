import { View, Text, Pressable } from "react-native";
import React from "react";
import ActionSheet from "./ActionSheet";
import { Feather } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { green600 } from "../constants/colors";

const AuthCodeActionsheet = ({ isVisible, onCancel }) => {
  return (
    <ActionSheet isVisible={isVisible} onCancel={onCancel}>
      <View className="bg-transparent -mt-16  justify-center items-center ">
        <Pressable
          onPress={onCancel}
          className="h-9 w-9  rounded-full bg-white  justify-center items-center  "
        >
          <Feather name="x" size={26} color="black" />
        </Pressable>
      </View>
      <View className="p-5 mt-10">
        <View>
          <Text className="text-center text-[22px] font-medium">
            Didn't get a code ?
          </Text>
          <Text className="text-neutral-500 mt-8 text-base text-center">
            If you didn't get a code, please try one of the options below
          </Text>
          <View className="flex-row justify-between mt-7">
            <View className="w-[46%]">
              <Button
                mode="outlined"
                // onPress={onPress}
                className="rounded-2xl"
                textColor="black"
              >
                Send Again
              </Button>
            </View>
            <View className="w-[46%]">
              <Button
                mode="contained"
                // onPress={onPress}
                buttonColor={green600}
                className="rounded-2xl"
              >
                Send Again
              </Button>
            </View>
          </View>
        </View>
      </View>
    </ActionSheet>
  );
};

export default AuthCodeActionsheet;

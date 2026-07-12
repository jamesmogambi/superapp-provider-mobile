import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import HomeStack from "./HomeStack";
import AuthStack from "./AuthStack";
import { green600 } from "../constants/colors";

const RootStack = () => {
  const { isLoaded, isSignedIn } = useAuth();

  // Wait for Clerk to restore the session from the token cache.
  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color={green600} />
      </View>
    );
  }

  return isSignedIn ? <HomeStack /> : <AuthStack />;
};

export default RootStack;

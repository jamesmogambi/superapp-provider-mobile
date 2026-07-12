import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { useSSO } from "@clerk/clerk-expo";
import { green600 } from "../constants/colors";

// Required for the OAuth browser to dismiss and return to the app.
WebBrowser.maybeCompleteAuthSession();

// Warms up / cools down the in-app browser on Android for a faster OAuth start.
const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

const SignIn = () => {
  useWarmUpBrowser();
  const { startSSOFlow } = useSSO();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onGoogleSignIn = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: AuthSession.makeRedirectUri(),
      });

      if (createdSessionId && setActive) {
        // Activating the session flips Clerk's isSignedIn -> true, which
        // makes RootStack render the app (HomeStack).
        await setActive({ session: createdSessionId });
      } else {
        // No session was created (e.g. the user cancelled or extra steps
        // such as MFA are required — not expected for basic Google sign-in).
        setError("Sign-in could not be completed. Please try again.");
      }
    } catch (err) {
      console.error("Google SSO error:", JSON.stringify(err, null, 2));
      setError("Something went wrong signing in with Google.");
    } finally {
      setLoading(false);
    }
  }, [loading, startSSOFlow]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-between p-6">
        {/* Branding */}
        <View className="flex-1 justify-center">
          <View className="space-y-2">
            <Text className="text-3xl text-neutral-800">Welcome to</Text>
            <Text className="text-green-600 text-4xl font-bold">
              Cabs&More
            </Text>
          </View>
          <Text className="text-base text-neutral-500 mt-3">
            Sign in to manage your services, orders and wallet.
          </Text>
        </View>

        {/* Actions */}
        <View className="space-y-4 mb-6">
          {error ? (
            <Text className="text-red-500 text-center text-sm">{error}</Text>
          ) : null}

          <Pressable
            onPress={onGoogleSignIn}
            disabled={loading}
            className={`flex-row items-center justify-center space-x-3 border border-neutral-300 rounded-xl py-4 ${
              loading ? "opacity-60" : ""
            }`}
          >
            {loading ? (
              <ActivityIndicator color={green600} />
            ) : (
              <>
                <AntDesign name="google" size={22} color="#DB4437" />
                <Text className="text-base font-medium text-neutral-800">
                  Continue with Google
                </Text>
              </>
            )}
          </Pressable>

          <Text className="text-xs text-neutral-400 text-center px-4">
            By continuing you agree to our Terms & Conditions and Privacy
            Policy.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

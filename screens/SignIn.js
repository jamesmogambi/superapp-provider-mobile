import React, { useCallback, useState } from "react";
import { View, Text, Pressable, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSignIn } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import InputOutline from "../components/InputOutline";
import ButtonContained from "../components/ButtonContained";

const clerkError = (err, fallback) =>
  err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message || fallback;

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSignIn = useCallback(async () => {
    if (!isLoaded || loading) return;
    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const attempt = await signIn.create({
        identifier: email.trim(),
        password,
      });

      if (attempt.status === "complete") {
        await setActive({ session: attempt.createdSessionId });
      } else {
        console.warn("Sign-in incomplete, status:", attempt.status);
        setError("Additional steps are required to sign in.");
      }
    } catch (err) {
      setError(clerkError(err, "Unable to sign in. Check your credentials."));
    } finally {
      setLoading(false);
    }
  }, [isLoaded, loading, email, password, signIn, setActive]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="p-6">
            {/* Branding */}
            <View className="space-y-2 mb-8">
              <Text className="text-3xl text-neutral-800">Welcome to</Text>
              <Text className="text-green-600 text-4xl font-bold">Cabs&More</Text>
              <Text className="text-base text-neutral-500 mt-2">
                Sign in to manage your services, orders and wallet.
              </Text>
            </View>

            {/* Form */}
            <View className="space-y-4">
              <InputOutline
                icon="email-outline"
                label="Email Address"
                value={email}
                onChange={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
              <InputOutline
                icon="lock-outline"
                label="Password"
                value={password}
                onChange={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                right={
                  <TextInput.Icon
                    icon={showPassword ? "eye-off" : "eye"}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
              />

              {error ? (
                <Text className="text-red-500 text-sm">{error}</Text>
              ) : null}

              <View className={`${loading ? "opacity-70" : ""} mt-2`}>
                <ButtonContained
                  label={loading ? "Signing in..." : "Sign In"}
                  handlePress={onSignIn}
                />
              </View>
            </View>

            {/* Footer */}
            <View className="flex-row justify-center mt-8 space-x-1">
              <Text className="text-neutral-500">Don't have an account?</Text>
              <Pressable onPress={() => navigation.navigate("SignUp")}>
                <Text className="text-green-600 font-semibold">Sign Up</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;

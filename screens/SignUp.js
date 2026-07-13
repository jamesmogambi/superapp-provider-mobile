import React, { useCallback, useState } from "react";
import { View, Text, Pressable, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useSignUp } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import InputOutline from "../components/InputOutline";
import ButtonContained from "../components/ButtonContained";

const clerkError = (err, fallback) =>
  err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message || fallback;

const SignUp = () => {
  const { signUp, setActive, isLoaded } = useSignUp();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSignUp = useCallback(async () => {
    if (!isLoaded || loading) return;
    if (!email.trim() || !password) {
      setError("Enter your email and a password.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await signUp.create({ emailAddress: email.trim(), password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      setError(clerkError(err, "Could not create your account."));
    } finally {
      setLoading(false);
    }
  }, [isLoaded, loading, email, password, signUp]);

  const onVerify = useCallback(async () => {
    if (!isLoaded || loading) return;
    if (!code.trim()) {
      setError("Enter the code we emailed you.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const attempt = await signUp.attemptEmailAddressVerification({
        code: code.trim(),
      });

      if (attempt.status === "complete") {
        await setActive({ session: attempt.createdSessionId });
        navigation.getParent()?.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
        return;
      }

      if (attempt.status === "missing_requirements") {
        const missing = attempt.missingRequirements || [];

        if (typeof signUp.reload === "function") {
          try {
            await signUp.reload();
          } catch (e) {
            console.warn("Failed to reload sign-up:", e);
          }
        }

        if (signUp.status === "complete") {
          await setActive({ session: signUp.createdSessionId });
          navigation.getParent()?.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
          return;
        }

        if (missing.length > 0) {
          setError(`Missing: ${missing.join(", ")}`);
        } else {
          setError("Verification incomplete. Please try again.");
        }
        return;
      }

      setError("Verification failed. Please try again.");
    } catch (err) {
      setError(clerkError(err, "Invalid or expired code."));
    } finally {
      setLoading(false);
    }
  }, [isLoaded, loading, code, signUp, setActive, navigation]);

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
            <Pressable onPress={() => navigation.goBack()} className="mb-6">
              <AntDesign name="arrow-left" size={24} color="green" />
            </Pressable>

            {!pendingVerification ? (
              <>
                <View className="space-y-2 mb-8">
                  <Text className="text-2xl text-neutral-800">
                    Get started with
                  </Text>
                  <Text className="text-green-600 text-3xl font-bold">
                    Cabs&More
                  </Text>
                </View>

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
                    secureTextEntry
                    autoCapitalize="none"
                  />

                  {error ? (
                    <Text className="text-red-500 text-sm">{error}</Text>
                  ) : null}

                  <View className={`${loading ? "opacity-70" : ""} mt-2`}>
                    <ButtonContained
                      label={loading ? "Creating account..." : "Create Account"}
                      handlePress={onSignUp}
                    />
                  </View>
                </View>

                <View className="flex-row justify-center mt-8 space-x-1">
                  <Text className="text-neutral-500">Already have an account?</Text>
                  <Pressable onPress={() => navigation.navigate("SignIn")}>
                    <Text className="text-green-600 font-semibold">Sign In</Text>
                  </Pressable>
                </View>
              </>
            ) : (
              <>
                <View className="space-y-2 mb-8">
                  <Text className="text-2xl text-neutral-800">
                    Verify your email
                  </Text>
                  <Text className="text-base text-neutral-500">
                    We sent a verification code to {email.trim()}.
                  </Text>
                </View>

                <View className="space-y-4">
                  <InputOutline
                    icon="shield-check-outline"
                    label="Verification Code"
                    value={code}
                    onChange={setCode}
                    keyboardType="number-pad"
                  />

                  {error ? (
                    <Text className="text-red-500 text-sm">{error}</Text>
                  ) : null}

                  <View className={`${loading ? "opacity-70" : ""} mt-2`}>
                    <ButtonContained
                      label={loading ? "Verifying..." : "Verify & Continue"}
                      handlePress={onVerify}
                    />
                  </View>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;

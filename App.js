import "react-native-gesture-handler";
import "./global.css";
import RootStack from "./navigation/RootStack";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "./utils/tokenCache";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    "Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY. Set it in your .env.development / .env.production file."
  );
}

export default function App() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <PaperProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </PaperProvider>
    </ClerkProvider>
  );
}

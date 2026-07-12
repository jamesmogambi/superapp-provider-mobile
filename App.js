import "react-native-gesture-handler";
import "./global.css";
import RootStack from "./navigation/RootStack";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </PaperProvider>
  );
}

import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { green600 } from "../constants/colors";
import Orders from "../screens/Orders";

const Tab = createMaterialTopTabNavigator();
const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="New"
      screenOptions={{
        tabBarActiveTintColor: "#404040",
        tabBarInactiveTintColor: "#404040",
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "500",
        },
        tabBarItemStyle: { width: 150 },
        tabBarStyle: { backgroundColor: "white" },
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: { backgroundColor: green600 },
      }}
    >
      <Tab.Screen name="New" component={Orders} />
      <Tab.Screen
        name="Accepted"
        component={Orders}
        options={{ tabBarLabel: "Accepted" }}
      />
      <Tab.Screen
        name="Processing"
        component={Orders}
        options={{ tabBarLabel: "In Process" }}
      />

      <Tab.Screen
        name="Rejected"
        component={Orders}
        options={{ tabBarLabel: "Rejected" }}
      />
      <Tab.Screen name="Completed" component={Orders} />
    </Tab.Navigator>
  );
};

export default HomeTabs;

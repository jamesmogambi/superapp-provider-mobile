import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StoreDrawer from "./AppDrawer";
import Notifications from "../screens/Notifications";
import EditProfile from "../screens/EditProfile";
import OrderDetails from "../screens/OrderDetails";
import OrderHistory from "../screens/OrderHistory";
import { services } from "../fixtures/service";
import Services from "../screens/Services";
import Packages from "../screens/Packages";
import AddPackage from "../screens/AddPackage";

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Root">
      <Stack.Screen
        name="Root"
        component={StoreDrawer}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ title: "Edit Profile" }}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{ title: "Order Details" }}
      />
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={{ title: "Order History" }}
      />
      <Stack.Screen name="Services" component={Services} />
      <Stack.Screen name="Packages" component={Packages} />
      <Stack.Screen
        name="AddPackage"
        component={AddPackage}
        options={{ title: "Add Package" }}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;

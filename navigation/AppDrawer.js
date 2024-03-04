import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "../components/CustomDrawerContent";
import Home from "../screens/Home";

const Drawer = createDrawerNavigator();

function StoreDrawer({ navigation, props }) {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ title: "Live Orders" }}
      />
    </Drawer.Navigator>
  );
}

export default StoreDrawer;

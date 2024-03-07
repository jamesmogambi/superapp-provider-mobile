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
import ServiceTime from "../screens/ServiceTime";
import UploadImage from "../screens/UploadImage";
import Wallet from "../screens/Wallet";
import TransactionHistory from "../screens/TransactionHistory";
import TransferFund from "../screens/TransferFund";
import SearchContact from "../screens/SearchContact";
import TopUp from "../screens/TopUp";
import LiveChat from "../screens/LiveChat";
import Support from "../screens/Support";
import SupportDetail from "../screens/SupportDetail";
import Chats from "../screens/Chats";
import Document from "../screens/Document";

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
      <Stack.Screen
        name="ServiceTime"
        component={ServiceTime}
        options={{ title: "Select Slot" }}
      />
      <Stack.Screen
        name="UploadImages"
        component={UploadImage}
        options={{ title: "Upload Images" }}
      />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="Transactions" component={TransactionHistory} />

      <Stack.Screen
        name="TransferFund"
        component={TransferFund}
        options={{ headerTitle: "Transfer" }}
      />
      <Stack.Screen
        name="SearchContact"
        component={SearchContact}
        options={{ headerTitle: "Search by Contact or Email" }}
      />
      <Stack.Screen name="TopUp" component={TopUp} />
      <Stack.Screen
        name="LiveChat"
        component={LiveChat}
        options={{ headerTitle: "Live Chat" }}
      />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen
        name="SupportDetail"
        component={SupportDetail}
        options={({ route }) => ({ title: `${route.params.name}` })}
      />
      <Stack.Screen
        name="Chats"
        component={Chats}
        options={{ title: "Live Chat" }}
      />
      <Stack.Screen name="Document" component={Document} />
    </Stack.Navigator>
  );
}

export default HomeStack;

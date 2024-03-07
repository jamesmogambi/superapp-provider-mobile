import { View, Text } from "react-native";
import Stack from "../components/Stack";
import WalletBalance from "../components/WalletBalance";
import PaymentActions from "../components/PaymentActions";
import WalletFilters from "../components/WalletFilters";
import { Divider } from "react-native-paper";
import Transactions from "../components/Transactions";

const Wallet = () => (
  <Stack>
    <View className="space-y-4 px-4 pb-5 pt-3  ">
      <View>
        <WalletBalance />
      </View>
      <View>
        <PaymentActions />
      </View>
      <View>
        <WalletFilters />
      </View>
    </View>
    <Divider />
    <View className="flex-1">
      <Transactions />
    </View>
  </Stack>
);

export default Wallet;

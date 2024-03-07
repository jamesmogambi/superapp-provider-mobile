import { View, Text } from "react-native";
import React from "react";
import WalletBalance from "../components/WalletBalance";
import TransferFundForm from "../components/TransferFundForm";
import Stack from "../components/Stack";

const TransferFund = () => {
  return (
    <Stack>
      <View className="p-4">
        <WalletBalance />
      </View>
      <View className="flex-1 p-4">
        <TransferFundForm />
      </View>
    </Stack>
  );
};

export default TransferFund;

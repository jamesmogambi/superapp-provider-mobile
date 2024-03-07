import { View, Text, FlatList } from "react-native";
import React from "react";
import { Divider } from "react-native-paper";
import TransactionItem from "./TransactionItem";
import { transactions } from "../fixtures/transaction";

const Transactions = () => {
  return (
    <FlatList
      data={transactions}
      renderItem={({ item, index }) => (
        <View>
          <TransactionItem transaction={item} />
        </View>
      )}
      ItemSeparatorComponent={<Divider />}
      keyExtractor={(item, index) => item + index}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default Transactions;

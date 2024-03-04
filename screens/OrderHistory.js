import { View, Text } from "react-native";
import React, { useState } from "react";
import Stack from "../components/Stack";
import FilterOrderActionSheet from "../components/FilterOrderActionSheet";
import Chips from "../components/Chips";
import OrderSummary from "../components/OrderSummary";
import History from "../components/History";

const options = [
  {
    name: "Today",
    dropDown: true,
  },
  {
    name: "Ongoing",
  },
  {
    name: "Completed",
  },
  {
    name: "Pending",
  },
];
const OrderHistory = () => {
  const [selectedOption, setSelectedOption] = useState(options[0].name);
  const [showdateActionSheet, setshowdateActionsheet] = useState(false);

  const handlePressChip = (param) => {
    setSelectedOption(param);
  };

  const handleDropDownChip = (param) => {
    setSelectedOption(param);
    setshowdateActionsheet(true);
  };
  return (
    <Stack>
      <FilterOrderActionSheet
        isVisible={showdateActionSheet}
        onCancel={() => setshowdateActionsheet(false)}
      />
      <View className="py-4">
        <Chips
          options={options}
          selectedOption={selectedOption}
          handleDropDownChip={handleDropDownChip}
          handlePressChip={handlePressChip}
        />
      </View>

      <View className="pb-5">
        <OrderSummary />
      </View>
      <View className="mt-3 flex-1 ">
        <History />
      </View>
    </Stack>
  );
};

export default OrderHistory;

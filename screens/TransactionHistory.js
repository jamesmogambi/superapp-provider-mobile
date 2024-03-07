import { View, Text } from "react-native";
import React, { useState } from "react";
import Stack from "../components/Stack";
import Chips from "../components/Chips";
import FilterOrderActionSheet from "../components/FilterOrderActionSheet";
import { transactions } from "../fixtures/transaction";
import Transactions from "../components/Transactions";

const options = [
  {
    name: "All",
  },
  {
    name: "Credit",
  },
  {
    name: "Debit",
  },
  {
    name: "By Dates",
    dropDown: true,
  },
  {
    name: "Services",
    dropDown: true,
  },
];

const TransactionHistory = () => {
  const [selectedOption, setSelectedOption] = useState(options[0].name);
  const [dateActionsheet, setdateActionsheet] = useState(false);
  const [serviceActionsheet, setServiceActionsheet] = useState(false);

  const handlePressChip = (param) => {
    setSelectedOption(param);
  };

  const showServiceActionSheet = () => {
    setServiceActionsheet(true);
  };

  const handleDropdownChip = (param) => {
    switch (param) {
      case "By Dates":
        showDateActionSheet();
        break;

      case "Services":
        showServiceActionSheet();

      default:
        break;
    }
  };

  const showDateActionSheet = () => {
    setdateActionsheet(true);
  };
  return (
    <Stack>
      <>
        <FilterOrderActionSheet
          isVisible={dateActionsheet}
          onCancel={() => setdateActionsheet(false)}
        />
        <FilterOrderActionSheet
          isVisible={serviceActionsheet}
          onCancel={() => setServiceActionsheet(false)}
          data={["Tutor", "AC Repair", "Mechanics"]}
          title="By Service"
        />
        <View className="px-4 my-4 py-2">
          <Chips
            options={options}
            handleDropDownChip={handleDropdownChip}
            handlePressChip={handlePressChip}
            selectedOption={selectedOption}
          />
        </View>
        <View className="flex-1">
          <Transactions />
        </View>
      </>
    </Stack>
  );
};

export default TransactionHistory;

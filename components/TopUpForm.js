import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import InputOutline from "./InputOutline";
import ButtonContained from "./ButtonContained";

const options = [
  {
    amount: 50.0,
  },
  {
    amount: 100,
  },

  {
    amount: 200,
  },
  {
    amount: 500,
  },
  {
    amount: 1000,
  },
  {
    amount: 2000,
  },
];
const TopUpForm = ({ onSubmit }) => {
  const [option, setOption] = useState(null);
  const [amount, setAmount] = useState(null);

  const handleOption = (param) => {
    setOption(param);
  };

  const handlePress = (param) => {
    console.log("amount", option || amount);
    onSubmit(amount);
  };
  return (
    <View className="flex-1 justify-between p-4">
      <ScrollView>
        <View className="gap-3">
          <View>
            <Text className="text-lg font-medium">Choose an amount</Text>
            <View className="flex-row justify-between flex-wrap">
              {options.map((i, k) => (
                <Pressable
                  key={k}
                  className={`${
                    option === i.amount && "bg-green-50 border-green-500"
                  } border-[0.5px] rounded-[20px] w-[30%]  py-4 my-3 `}
                  onPress={() => handleOption(i.amount)}
                >
                  <Text className="font-semibold text-center ">
                    Ksh {i.amount}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
          <View>
            <InputOutline
              label="Or Enter Amount"
              value={amount}
              honChange={setAmount}
              keyboardType="number-pad"
            />
          </View>
        </View>
      </ScrollView>
      <View>
        <ButtonContained label={"Process"} handlePress={handlePress} />
      </View>
    </View>
  );
};

export default TopUpForm;

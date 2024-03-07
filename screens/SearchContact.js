import { View, Text } from "react-native";
import React, { useState } from "react";
import Stack from "../components/Stack";
import RoundedInput from "../components/RoundedInput";
import SearchContactResultItem from "../components/SearchContactResultItem";

const searchResult = [
  {
    image: "https://mui.com/static/images/avatar/1.jpg",
    name: "James Mugambi",
    email: "mugambijames96@gmail.com",
    contact: "0701694004",
    role: "Customer",
  },
];
const SearchContact = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <Stack>
      <View className="flex-1  p-4 space-y-5">
        <View>
          <RoundedInput
            label="Find Contact or Email"
            value={searchTerm}
            handleChange={setSearchTerm}
          />
        </View>
        {searchResult.length === 0 ? (
          <View className="flex-1  justify-center">
            <Text className="text-lg text-center">
              Please enter the contact number or email to search for the person
            </Text>
          </View>
        ) : (
          <View className="flex-1">
            {searchResult.map((i, k) => (
              <SearchContactResultItem key={k} user={i} />
            ))}
          </View>
        )}
      </View>
    </Stack>
  );
};

export default SearchContact;

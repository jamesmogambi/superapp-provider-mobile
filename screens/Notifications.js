import { FlatList } from "react-native";
import React from "react";
import Stack from "../components/Stack";
import { Divider } from "react-native-paper";
import NotificationItem from "../components/NotificationItem";
import { notifications } from "../fixtures/notification";

const Notifications = () => {
  return (
    <Stack>
      <FlatList
        className="px-3"
        data={notifications}
        renderItem={({ item }) => <NotificationItem notification={item} />}
        keyExtractor={(item, index) => item + index}
        ItemSeparatorComponent={<Divider />}
        showsVerticalScrollIndicator={false}
      />
    </Stack>
  );
};

export default Notifications;

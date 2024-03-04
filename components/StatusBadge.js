import { View, Text } from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";

const StatusBadge = ({ status }) => {
  return (
    <View
      className={`${
        status === "Completed" && "bg-green-100 border-green-600"
      } ${status === "Pending" && `bg-orange-100 border-orange-300`} ${
        status === "Canceled" && "bg-red-100 border-red-600"
      }
       ${status === "Processing" && `bg-orange-100 border-orange-300`}
      border-[0.5px]  rounded-md flex-row items-center  space-x-1 pr-2 `}
    >
      <View
        className={`${status === "Completed" && "bg-green-600"} ${
          status === "Pending" && `bg-orange-300 `
        } ${status === "Canceled" && "bg-red-500 "} 
        ${status === "Processing" && `bg-orange-300 `}
        flex-row justify-center  rounded-md w-7 h-7  items-center`}
      >
        {status === "Completed" && (
          <FontAwesome5 name="clipboard-check" size={18} color="white" />
        )}
        {status === "New Order" && (
          <FontAwesome5 name="clipboard-check" size={18} color="white" />
        )}
        {status === "Pending" && (
          <FontAwesome5 name="clipboard-list" size={18} color="white" />
        )}
        {status === "Canceled" && (
          <MaterialCommunityIcons name="book-cancel" size={18} color="white" />
        )}
        {status === "Processing" && (
          <MaterialIcons name="loop" size={18} color="white" />
        )}
      </View>
      <Text className="text-[15px]"> {status}</Text>
    </View>
  );
};

export default StatusBadge;

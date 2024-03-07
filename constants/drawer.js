import {
  Feather,
  MaterialCommunityIcons,
  Ionicons,
  SimpleLineIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { green600 } from "./colors";

export const items = [
  {
    name: "My Profile",
    icon: <Feather name="user" size={24} color={green600} />,
    path: "EditProfile",
  },
  {
    name: "Order History",
    icon: <Feather name="bar-chart" size={24} color={green600} />,
    path: "OrderHistory",
  },
  {
    name: "Service & Package",
    icon: (
      <MaterialCommunityIcons
        name="package-variant-closed"
        size={24}
        color={green600}
      />
    ),
    path: "Services",
  },
  {
    name: "Service Time",
    icon: <Ionicons name="time-outline" size={24} color={green600} />,
    path: "ServiceTime",
  },
  {
    name: "Document",
    icon: <Ionicons name="document-text-outline" size={24} color={green600} />,
    path: "Document",
  },
  {
    name: "Upload Images",
    icon: <Ionicons name="image-outline" size={24} color={green600} />,
    path: "UploadImages",
  },
  {
    name: "Wallet",
    icon: <Ionicons name="wallet-outline" size={24} color={green600} />,
    path: "Wallet",
  },
  {
    name: "Notifications",
    icon: <Ionicons name="notifications-outline" size={24} color={green600} />,
    path: "Notifications",
  },
  {
    name: "Chat With Admin",
    icon: (
      <Ionicons name="chatbox-ellipses-outline" size={24} color={green600} />
    ),
    path: "LiveChat",
  },
  {
    name: "Support",
    icon: <AntDesign name="questioncircleo" size={24} color={green600} />,
    path: "Support",
  },
  {
    name: "Live Chat",
    icon: <Ionicons name="chatbubble-outline" size={24} color={green600} />,
    path: "Chats",
  },
];

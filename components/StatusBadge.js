import { View, Text } from "react-native";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const STATUS_CONFIG = {
  new: {
    label: "New",
    bg: "bg-blue-100",
    border: "border-blue-600",
    dot: "bg-blue-600",
    icon: "clipboard-check",
    iconFamily: FontAwesome5,
  },
  accepted: {
    label: "Accepted",
    bg: "bg-cyan-100",
    border: "border-cyan-600",
    dot: "bg-cyan-600",
    icon: "clipboard-check",
    iconFamily: FontAwesome5,
  },
  "in-process": {
    label: "In Process",
    bg: "bg-orange-100",
    border: "border-orange-300",
    dot: "bg-orange-300",
    icon: "loop",
    iconFamily: MaterialIcons,
  },
  rejected: {
    label: "Rejected",
    bg: "bg-red-100",
    border: "border-red-600",
    dot: "bg-red-500",
    icon: "book-cancel",
    iconFamily: MaterialCommunityIcons,
  },
  completed: {
    label: "Completed",
    bg: "bg-green-100",
    border: "border-green-600",
    dot: "bg-green-600",
    icon: "clipboard-check",
    iconFamily: FontAwesome5,
  },
};

const normalizeStatus = (status) => {
  if (!status) return "new";
  const key = status.toLowerCase().trim();
  return STATUS_CONFIG[key] ? key : "new";
};

const StatusBadge = ({ status }) => {
  const key = normalizeStatus(status);
  const config = STATUS_CONFIG[key];
  const IconComponent = config.iconFamily;

  return (
    <View
      className={`${config.bg} ${config.border} border-[0.5px] rounded-md flex-row items-center gap-2 pr-2`}
    >
      <View
        className={`${config.dot} flex-row justify-center rounded-md w-7 h-7 items-center`}
      >
        <IconComponent name={config.icon} size={18} color="white" />
      </View>
      <Text className="text-[15px]">{config.label}</Text>
    </View>
  );
};

export default StatusBadge;

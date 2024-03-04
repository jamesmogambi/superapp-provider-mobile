import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { green600 } from "../constants/colors";
import { items } from "../constants/drawer";
import LogoutModal from "./LogoutModal";
import { useState } from "react";

const CustomDrawerContent = (props) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { navigation } = props;

  const handleNavigation = (param) => {
    navigation.closeDrawer();
    return navigation.navigate(param);
  };

  const showModal = () => {
    navigation.closeDrawer();
    setShowLogoutModal(true);
  };
  return (
    <>
      <LogoutModal
        isVisible={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
      />
      {/* header */}
      <View className=" py-5 flex-row space-x-3  items-center px-4  mt-10">
        <Image
          className="rounded-full h-20 w-20"
          source={require("../assets/images/user.jpg")}
        />
        <View>
          <Text className="text-green-600 text-xl font-semibold">
            Provider Name
          </Text>
        </View>
      </View>
      <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
        <View className="-mt-14 ">
          {/* <DrawerItemList {...props} /> */}

          {items.map((i, k) => (
            <View
              key={k}
              className={`${
                k !== items.length - 1 && "border-b-[0.5px] border-neutral-300"
              }`}
            >
              <DrawerItem
                label={i.name}
                labelStyle={{ fontSize: 17, fontWeight: "400", color: "black" }}
                onPress={() => handleNavigation(i.path)}
                icon={({ focused, color, size }) => <>{i.icon}</>}
              />
            </View>
          ))}
          <DrawerItem
            label={"Logout"}
            labelStyle={{ fontSize: 17, fontWeight: "400", color: "black" }}
            onPress={showModal}
            icon={({ focused, color, size }) => (
              <MaterialIcons name="logout" size={24} color={green600} />
            )}
          />
        </View>
      </DrawerContentScrollView>

      {/* footer */}
      <View className=" py-8"></View>
    </>
  );
};

export default CustomDrawerContent;

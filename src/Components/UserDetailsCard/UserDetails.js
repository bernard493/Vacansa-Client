import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const UserDetails = ({ user, toggleModal }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      <View className="space-y-2">
        <View className="space-y-2">
          <Text className="text-[14px] font-bold">Full Name</Text>
          <View className="p-3 bg-gray-100  rounded-lg">
            <Text className="">{user?.name}</Text>
          </View>
        </View>
        <View className="space-y-2">
          <Text className="text-[14px] font-bold">Email</Text>
          <View className="p-3 bg-gray-100  rounded-lg">
            <Text className="">{user?.email}</Text>
          </View>
        </View>
        <View className="space-y-2">
          <Text className="text-[14px] font-bold">Phone Number</Text>
          <View className="p-3 bg-gray-100  rounded-lg">
            <Text className="">{user?.phoneNumber}</Text>
          </View>
        </View>

        <View className="py-2 pt-5 flex items-right  ">
          <TouchableOpacity
            onPress={toggleModal}
            className="bg-gray-200 p-3 flex-row items-center justify-between rounded-lg"
          >
            <View className="flex-row items-center justify-center space-x-3">
              <Ionicons name="create-outline" size={25} color={"gray"} />

              <Text className=" text-md font-semibold">Update Details</Text>
            </View>
            <Ionicons name="chevron-down-outline" size={30} color={"gray"} />
          </TouchableOpacity>
        </View>
        <View className="py-2  flex items-right  ">
          <TouchableOpacity
            // onPress={logoutUser}
            // navigate to update
            className="bg-gray-200 p-3 flex-row items-center justify-between rounded-lg"
          >
            <View className="flex-row items-center justify-center space-x-3">
              <Ionicons name="finger-print-outline" size={25} color={"gray"} />

              <Text className=" text-md font-semibold">
                Privacy and Security
              </Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={30} color={"gray"} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default UserDetails;

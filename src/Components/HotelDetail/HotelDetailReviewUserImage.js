import { View, Text, Image } from "react-native";
import React from "react";
import { Avatar } from "native-base";

const HotelDetailReviewUserImage = ({ review }) => {
  return (
    <View className="">
      <Avatar.Group
        _avatar={{
          size: "sm",
        }}
        max={3}
      >
        {review?.map((reviewItem) => {
          return (
            <Avatar
            
              bg="green.500"
              source={{
                uri: reviewItem.user?.avatar,
              }}
              key={reviewItem._id}
            >
              {reviewItem.user.name?.charAt(0) }
             
            </Avatar>
          );
        })}
      </Avatar.Group>
    </View>
  );
};

export default HotelDetailReviewUserImage;

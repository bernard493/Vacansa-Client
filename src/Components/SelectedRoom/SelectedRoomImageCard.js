import { View, Text ,StyleSheet,Image} from 'react-native'
import React from 'react'

const SelectedRoomImageCard = ({image}) => {
  return (
    <View className="m-2">
      <Image
          source={{
            uri:image,
          }}
          style={styles.image}
          className="rounded-xl"
        />
    </View>
  )
}

const styles = StyleSheet.create({
    image: {
      width: 240,
      height: 270,
    },
  });
export default SelectedRoomImageCard
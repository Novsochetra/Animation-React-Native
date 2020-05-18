import React, {ReactElement} from 'react'
import {
  View,
  StyleSheet,
  Text,
  ImageSourcePropType,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleProp,
  ViewStyle,
} from 'react-native'
import Animated from 'react-native-reanimated'

type StoryProps = {
  source: ImageSourcePropType
  name: string
  profileStyle: any
}
export const CARD_WIDTH = Dimensions.get('window').width / 4
export const CARD_HEIGHT = 180
export const CARD_MARGIN = 5
export const CARD_CONTAINER_WIDTH = CARD_WIDTH + CARD_MARGIN * 2

export const Story = ({source, name, profileStyle}: StoryProps): ReactElement => {
  return (
    <TouchableOpacity style={[styles.cardContainer]} activeOpacity={0.8}>
      <Image source={source} style={styles.img} />
      <Text style={styles.profileName}>{name}</Text>
      <Animated.View
        style={[
          styles.profileContainer,
          profileStyle,
          // {
          //   transform: [
          //     {translateX: CARD_CONTAINER_WIDTH / 2},
          //     {translateY: name === 'Sochetra' ? CARD_HEIGHT / 2 - 20 : 0},
          //   ],
          // },
        ]}>
        <Image source={source} style={styles.profileURL} />
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'lightgray',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    margin: CARD_MARGIN,
  },

  img: {
    borderRadius: 10,
    height: '100%',
    width: '100%',
  },

  profileName: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    color: '#fff',
  },

  profileContainer: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#fff',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 5,
    left: 5,
  },

  profileURL: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
})

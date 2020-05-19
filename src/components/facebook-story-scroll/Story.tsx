import React, {ReactElement} from 'react'
import {StyleSheet, Text, ImageSourcePropType, Dimensions, Image} from 'react-native'
import Animated from 'react-native-reanimated'
import {Feather} from '@expo/vector-icons'

type StoryProps = {
  index: number
  source: ImageSourcePropType
  name: string
  containerStyle: any
  profileContainerStyle: any
  profileImageStyle: any
  textStyle: any
  plusIconContainerStyle: any
}
export const CARD_WIDTH = Dimensions.get('window').width / 4 + 15
export const CARD_HEIGHT = 200
export const CARD_MARGIN = 5
export const CARD_CONTAINER_WIDTH = CARD_WIDTH + CARD_MARGIN * 2

export const Story = ({
  index,
  source,
  name,
  containerStyle,
  profileContainerStyle,
  profileImageStyle,
  textStyle,
  plusIconContainerStyle,
}: StoryProps): ReactElement => {
  return (
    <Animated.View style={[styles.cardContainer, containerStyle]}>
      {index === 0 ? (
        <Animated.View style={[styles.ownProfileContainer, profileContainerStyle]}>
          <Animated.Image source={source} style={[styles.ownProfileImage, profileImageStyle]} />
          <Animated.View style={[styles.plusIconContainer, plusIconContainerStyle]}>
            <Feather name="plus-circle" size={40} color="#0066ff" style={styles.addIcon} />
          </Animated.View>
          <Animated.Text style={[styles.createStoryText, textStyle]}>Create a Story</Animated.Text>
        </Animated.View>
      ) : (
        <>
          <Image source={source} style={[styles.img]} />
          {index !== 0 && <Text style={styles.profileName}>{name}</Text>}
          <Animated.View style={[styles.profileContainer]}>
            <Image source={source} style={[styles.profileURL]} />
          </Animated.View>
        </>
      )}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    margin: CARD_MARGIN,
    borderWidth: 1,
    borderColor: 'lightgray',
  },

  img: {
    borderRadius: 10,
    height: '100%',
    width: '100%',
  },

  ownProfileContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
  },

  ownProfileImage: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: 'lightgray',
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  },

  createStoryText: {
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 5,
    textAlign: 'center',
  },

  profileName: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    fontSize: 12,
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

  plusIconContainer: {
    backgroundColor: '#fff',
    width: 42,
    height: 42,
    position: 'absolute',
    top: (CARD_HEIGHT * 60) / 100 - 20,
    alignSelf: 'center',
    borderRadius: 21,
  },

  addIcon: {
    top: 1,
    left: 1,
  },
})

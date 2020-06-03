import React, {ReactElement} from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import Animated, {diffClamp, interpolate, Extrapolate, concat} from 'react-native-reanimated'
import {PanGestureHandler} from 'react-native-gesture-handler'
import {usePanGestureHandler, withDecay, withOffset} from 'react-native-redash'
import {Card, Cards, CARD_HEIGHT, CARD_WIDTH} from '../common/Card'

type InstagramStoryScrollProps = {}

const containerHeight = Dimensions.get('window').height
const containerWidth = Dimensions.get('window').width

const cards = [
  {
    type: Cards.Card1,
  },
  {type: Cards.Card3},
]

export const InstagramStoryScroll = (_: InstagramStoryScrollProps): ReactElement => {
  const {gestureHandler, position, state, translation, velocity} = usePanGestureHandler()

  const minClamp = -90
  const maxClamp = 0
  const translateX = diffClamp(withOffset(translation.x, state), minClamp, maxClamp)

  const rotateY = interpolate(translateX, {
    inputRange: [minClamp, maxClamp],
    outputRange: [-90, 0],
    extrapolate: Extrapolate.CLAMP,
  })

  const rotateY1 = interpolate(translateX, {
    inputRange: [minClamp, maxClamp],
    outputRange: [0, 90],
    extrapolate: Extrapolate.CLAMP,
  })

  const positionX1 = interpolate(rotateY1, {
    inputRange: [0, 90],
    outputRange: [-CARD_WIDTH / 2, -100],
    extrapolate: Extrapolate.CLAMP,
  })

  return (
    <View>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={styles.imageContainer}>
          <Animated.View
            style={[
              styles.image,
              //   {transform: [{perspective: 2000}, {}, {rotateY: concat(rotateY, 'deg')}]},
              {transform: [{perspective: 2000}, {}, {rotateY: '-85deg'}]},
            ]}>
            <Card type={cards[0].type} />
          </Animated.View>
          <Animated.View
            style={[
              styles.image,
              {
                transform: [
                  {perspective: 800},
                  {translateX: positionX1},
                  //   {rotateY: concat(rotateY1, 'deg')},
                  {rotateY: '-85deg'},
                ],
              },
            ]}>
            <Card type={cards[1].type} />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    ...StyleSheet.absoluteFillObject,
    top: (containerHeight - CARD_HEIGHT) / 2,
    width: containerWidth,
    backgroundColor: 'blue',
    height: CARD_HEIGHT,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },

  image: {
    ...StyleSheet.absoluteFillObject,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: 'green',
  },
})

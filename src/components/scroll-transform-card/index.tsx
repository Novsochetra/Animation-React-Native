import React, {ReactElement, useState} from 'react'
import {StyleSheet, Dimensions} from 'react-native'
import Animated, {interpolate, add, Extrapolate} from 'react-native-reanimated'
import {usePanGestureHandler, diffClamp, withDecay} from 'react-native-redash'
import {PanGestureHandler} from 'react-native-gesture-handler'
import {Card, Cards, CARD_HEIGHT} from '../common/Card'

type ScrollTransformCardProps = {}

const height = Dimensions.get('window').height

const MARGIN = 16
const HEIGHT = CARD_HEIGHT + MARGIN * 2

const cards = [
  {
    type: Cards.Card1,
  },
  {
    type: Cards.Card2,
  },
  {
    type: Cards.Card3,
  },
  {
    type: Cards.Card4,
  },
  {
    type: Cards.Card5,
  },
  {
    type: Cards.Card6,
  },
]

export const ScrollTransformCard = (_: ScrollTransformCardProps): ReactElement => {
  const {gestureHandler, state, translation, velocity} = usePanGestureHandler()
  const [containerHeight, setContainerHeight] = useState(height)
  const visibleCards = Math.floor(containerHeight / HEIGHT)
  const minClamp = -HEIGHT * cards.length + visibleCards * HEIGHT
  const maxClamp = 0

  const y = diffClamp(
    withDecay({value: translation.y, velocity: velocity.y, state}),
    minClamp,
    maxClamp
  )

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={styles.container}
        onLayout={({nativeEvent: {layout}}) => setContainerHeight(layout.height)}>
        {cards.map(({type}, index) => {
          const isTop = 0
          const isAppearring = HEIGHT * visibleCards
          const isDisappearing = -HEIGHT
          const isBottom = HEIGHT * (visibleCards - 1)
          const positionY = add(y, index * HEIGHT)

          const translateWithScale = interpolate(positionY, {
            inputRange: [isBottom, isAppearring],
            outputRange: [0, -HEIGHT / 4],
            extrapolate: Extrapolate.CLAMP,
          })

          const translateY = add(
            interpolate(y, {
              inputRange: [-HEIGHT * index, 0],
              outputRange: [-HEIGHT * index, 0],
              extrapolate: Extrapolate.CLAMP,
            }),
            translateWithScale
          )

          const scale = interpolate(positionY, {
            inputRange: [isDisappearing, isTop, isBottom, isAppearring],
            outputRange: [0.5, 1, 1, 0.5],
            extrapolate: Extrapolate.CLAMP,
          })

          return (
            <Animated.View style={[styles.card, {transform: [{translateY}, {scale}]}]} key={index}>
              <Card type={type} />
            </Animated.View>
          )
        })}
      </Animated.View>
    </PanGestureHandler>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    marginTop: 40,
    alignItems: 'center',
  },

  card: {
    marginVertical: MARGIN,
  },
})

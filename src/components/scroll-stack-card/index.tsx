import React, {ReactElement, useState} from 'react'
import {StyleSheet, Dimensions} from 'react-native'
import Animated, {interpolate, Extrapolate} from 'react-native-reanimated'
import {usePanGestureHandler, diffClamp, withDecay} from 'react-native-redash'
import {PanGestureHandler} from 'react-native-gesture-handler'
import {Card, Cards, CARD_HEIGHT} from '../common/Card'

type ScrollStackCardProps = {}

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

export const ScrollStackCard = (_: ScrollStackCardProps): ReactElement => {
  const {gestureHandler, state, translation, velocity} = usePanGestureHandler()
  const minClamp = -HEIGHT * 5
  const maxClamp = 0

  const y = diffClamp(
    withDecay({value: translation.y, velocity: velocity.y, state}),
    minClamp,
    maxClamp
  )

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={styles.container}>
        {cards.map(({type}, index) => {
          const translateY = interpolate(y, {
            inputRange: [-HEIGHT * index, 0],
            outputRange: [(-HEIGHT + 20) * index, 0],
            extrapolate: Extrapolate.CLAMP,
          })
          return (
            <Animated.View style={[styles.card, {transform: [{translateY}]}]} key={index}>
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

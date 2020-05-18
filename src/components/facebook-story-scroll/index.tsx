import React, {ReactElement, useState} from 'react'
import {View, StyleSheet, SafeAreaView} from 'react-native'
import Animated, {add, Extrapolate, interpolate, multiply} from 'react-native-reanimated'
import {PanGestureHandler} from 'react-native-gesture-handler'
import {Story, CARD_HEIGHT, CARD_MARGIN, CARD_WIDTH, CARD_CONTAINER_WIDTH} from './Story'
import {usePanGestureHandler, withOffset, diffClamp, withDecay} from 'react-native-redash'

type FacebookStoryScrollProps = {}

const STORIES = [
  {source: require('./img/story1.jpg'), name: 'Sochetra', profileURL: ''},
  {source: require('./img/story2.jpg'), name: 'Fai', profileURL: ''},
  {source: require('./img/story3.jpg'), name: 'Chanty', profileURL: ''},
  {source: require('./img/story4.jpg'), name: 'Kim Hour', profileURL: ''},
  {source: require('./img/story5.jpg'), name: 'Devith', profileURL: ''},
  {source: require('./img/story6.jpg'), name: 'Soben', profileURL: ''},
]

export const FacebookStoryScroll = (_: FacebookStoryScrollProps): ReactElement => {
  //   const [containerWidth, setContainerWidth] = useState(0)
  const {gestureHandler, translation, velocity, state} = usePanGestureHandler()
  //   -HEIGHT * cards.length + visibleCards * HEIGHT
  //   const storiesVisible = Math.floor(containerWidth / CARD_CONTAINER_WIDTH)
  const maxClamp =
    -STORIES.length * (CARD_WIDTH + CARD_MARGIN * 2) + 4 * CARD_WIDTH - CARD_MARGIN * 2
  const minClamp = 0

  const x = diffClamp(
    withDecay({
      value: translation.x,
      velocity: velocity.x,
      state,
    }),
    maxClamp,
    minClamp
  )

  return (
    <SafeAreaView style={styles.safearea}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={styles.container}
          //   onLayout={({nativeEvent: {layout}}) => setContainerWidth(layout.width)}>
        >
          {STORIES.map((s, i) => {
            const isLeft = 0
            const isAppearring = CARD_CONTAINER_WIDTH * STORIES.length
            const isDisappearing = -CARD_CONTAINER_WIDTH
            const isRight = CARD_CONTAINER_WIDTH * (STORIES.length - 1)
            const positionX = add(translation.x, CARD_CONTAINER_WIDTH * i)

            const translateX = multiply(
              interpolate(x, {
                inputRange: [-CARD_CONTAINER_WIDTH * i, 0],
                outputRange: [-CARD_CONTAINER_WIDTH * i, 0],
                //   extrapolate: Extrapolate.CLAMP,
              }),
              i
            )

            const transformHeight = interpolate(positionX, {
              inputRange: [isDisappearing, isLeft, isRight, isAppearring],
              outputRange: [50, CARD_HEIGHT, CARD_HEIGHT, CARD_HEIGHT],
              extrapolate: Extrapolate.CLAMP,
            })

            const profileTranslatX = interpolate(translation.x, {
              inputRange: [isDisappearing, isLeft],
              outputRange: [CARD_CONTAINER_WIDTH / 2 - 5, 0],
              extrapolate: Extrapolate.CLAMP,
            })

            return (
              <Animated.View
                key={i}
                style={[
                  styles.storyItemContainer,
                  {transform: [{translateX}], zIndex: -i, height: transformHeight},
                ]}>
                <Story
                  source={s.source}
                  name={s.name}
                  profileStyle={{
                    transform: [{translateX: profileTranslatX}],
                  }}
                />
              </Animated.View>
            )
          })}
        </Animated.View>
      </PanGestureHandler>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: 'lightgray',
  },

  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },

  storyItemContainer: {
    display: 'flex',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    margin: 5,
  },
})

import React, {ReactElement} from 'react'
import {Image, View, Text, StyleSheet, Dimensions, SafeAreaView} from 'react-native'
import Animated, {
  diffClamp,
  interpolate,
  Extrapolate,
  concat,
  multiply,
  add,
  sub,
  sin,
  cos,
  debug,
  block,
  divide,
} from 'react-native-reanimated'
import {PanGestureHandler} from 'react-native-gesture-handler'
import {usePanGestureHandler, withDecay, withOffset, minus} from 'react-native-redash'
import {Card, Cards, CARD_HEIGHT, CARD_WIDTH} from '../common/Card'

type InstagramStoryScrollProps = {}

const containerHeight = Dimensions.get('window').height
const containerWidth = Dimensions.get('window').width
const r = containerWidth
// const r = containerWidth

const Images = [
  require('../../assets/images/image-1.jpg'),
  // require('../../assets/images/image-4.jpg'),
]

export const InstagramStoryScroll = (_: InstagramStoryScrollProps): ReactElement => {
  const {gestureHandler, state, position, velocity, translation} = usePanGestureHandler()
  const minClamp = -containerWidth
  const maxClamp = 0
  const translateX = diffClamp(withOffset(translation.x, state), minClamp, maxClamp)
  const rotateY1 = interpolate(translateX, {
    inputRange: [-containerWidth, 0],
    outputRange: [-90, 0],
    extrapolate: Extrapolate.CLAMP,
  })
  console.log('Container width: ', containerWidth)
  const radian = multiply(rotateY1, divide(Math.PI, 180))
  const opposite = multiply(cos(radian), r)
  const distance = multiply(sub(r, opposite), 2)
  // const angel = 90
  // const opposite = Math.cos(angel * (Math.PI / 180)) * containerWidth
  // console.log('oppo: ', opposite)
  // const distance = containerWidth - Math.abs(opposite)
  // console.log('distance: ', distance)
  return (
    <SafeAreaView style={styles.container}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={
            {
              // flexDirection: 'row',
              // height: containerHeight,
              // transform: [{translateX}],
            }
          }>
          {Images.map((source, index) => {
            const res = index % 2 === 0 ? 1 : -1

            const rotateY2 = interpolate(translateX, {
              inputRange: [-containerWidth, 0, containerWidth],
              outputRange: [0, 90, 90],
              extrapolate: Extrapolate.CLAMP,
            })

            // const distance = interpolate(rotateY1, {
            //   inputRange: [-90, 0],
            //   outputRange: [0, containerWidth / 3],
            //   extrapolate: Extrapolate.CLAMP,
            // })

            const scaleY1 = interpolate(rotateY1, {
              inputRange: [-90, 0],
              outputRange: [0.75, 1],
              extrapolate: Extrapolate.CLAMP,
            })

            const scaleY2 = interpolate(rotateY2, {
              inputRange: [0, 90],
              outputRange: [1, 0.75],
              extrapolate: Extrapolate.CLAMP,
            })

            return (
              <Animated.View
                key={index}
                style={{
                  height: containerHeight / 2,
                  transform: [
                    {perspective: containerHeight},
                    // {translateX: index === 0 ? translateX : translateX},
                    {
                      rotateY: concat(rotateY1, 'deg'),
                    },
                    // {scaleY: index === 0 ? 1 : scaleY2},
                  ],
                }}>
                <Image source={source} style={styles.image} />
              </Animated.View>
            )
          })}
          <Animated.View
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              backgroundColor: 'blue',
              width: distance,
              height: containerHeight,
            }}
          />
        </Animated.View>
      </PanGestureHandler>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },

  image: {
    width: containerWidth,
    height: '100%',
    backgroundColor: 'green',
  },
})

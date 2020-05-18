import React, {ReactElement} from 'react'
import {StyleSheet, Image, Dimensions} from 'react-native'
import Animated from 'react-native-reanimated'
import {PanGestureHandler, State} from 'react-native-gesture-handler'
import {usePanGestureHandler, useValue, snapPoint, useClock, timing} from 'react-native-redash'

const IMAGES = [
  require('../../assets/images/image-1.jpg'),
  require('../../assets/images/image-2.jpg'),
  require('../../assets/images/image-3.jpg'),
  require('../../assets/images/image-4.jpg'),
]

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const {useCode, cond, eq, set, add} = Animated
const snapPoints = IMAGES.map((image, i) => i * -WIDTH)

export const ScrollViewImagesGallery = (): ReactElement => {
  const {gestureHandler, state, translation, velocity} = usePanGestureHandler()
  const translateX = useValue(0)
  const offsetX = useValue(0)
  const clock = useClock()
  const to = snapPoint(translateX, velocity.x, snapPoints)

  useCode(
    () => [
      // when we start swiping what should we do ?
      cond(eq(state, State.ACTIVE), [set(translateX, add(translation.x, offsetX))]),
      // when we stop swipe what should we do ?
      cond(eq(state, State.END), [
        set(translateX, timing({clock, from: translateX, to})),
        set(offsetX, translateX),
      ]),
    ],
    []
  )

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={StyleSheet.absoluteFill}>
        <Animated.View style={[styles.container, {transform: [{translateX}]}]}>
          {IMAGES.map((image, i) => (
            <Image key={i} source={image} style={styles.image} resizeMethod="resize" />
          ))}
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH,
    height: HEIGHT,
    // transform: [{rotateY: '45deg'}],
  },
})

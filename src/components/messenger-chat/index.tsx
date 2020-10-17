import React, {ReactNode, useMemo} from 'react'
import {View, Text, StyleSheet, Dimensions, SafeAreaView} from 'react-native'
import Animated, {
  Value,
  event,
  useCode,
  debug,
  sub,
  cond,
  eq,
  block,
  stopClock,
  Clock,
  set,
  add,
  diff,
  neq,
  defined,
  clockRunning,
  startClock,
  spring,
  SpringUtils,
  not,
  multiply,
  lessThan,
} from 'react-native-reanimated'
import {PanGestureHandler, State} from 'react-native-gesture-handler'

const SCREEN_WIDTH = Dimensions.get('window').width
const ITEM_SIZE = 100

export const MessengerChatHead = (): ReactNode => {
  const dragX = new Value<number>(0)
  const dragY = new Value<number>(0)
  const dragVX = new Value<number>(0)
  const prevDragX = new Value<number>(0)
  const prevDragY = new Value<number>(0)
  const gestureState = new Value<number>(-1)
  const currentTranslateX = new Value<number>(0)
  const currentTranslateY = new Value<number>(0)
  // const {clock} = useMemo(() => ({clock: new Clock()}), [])
  const clock = new Clock()
  const TOSS_SEC = 0.2
  const snapPoint = cond(
    lessThan(add(currentTranslateX, multiply(TOSS_SEC, dragVX)), 0),
    -(SCREEN_WIDTH - ITEM_SIZE) / 2,
    (SCREEN_WIDTH - ITEM_SIZE) / 2
  )
  // const snapPoint = (SCREEN_WIDTH - ITEM_SIZE) / 2

  const springConfig = {
    damping: 12,
    mass: 1,
    stiffness: 150,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
    toValue: snapPoint,
  }
  const animationState = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    velocity: dragVX,
  }

  const onPanGestureEvent = event([
    {
      nativeEvent: {
        translationX: dragX,
        translationY: dragY,
        velocityX: dragVX,
        state: gestureState,
      },
    },
  ])

  const diffDistancePerFrame = sub(dragX, prevDragX)
  const translateXPerFrame = add(currentTranslateX, diffDistancePerFrame)

  const isMoving = eq(gestureState, State.ACTIVE)
  const isNotActive = neq(gestureState, -1)
  const updateSpringState = [
    set(animationState.finished, 0),
    set(animationState.position, dragX),
    set(animationState.velocity, dragVX),
    startClock(clock),
  ]

  const translateX = cond(
    isMoving,
    [
      stopClock(clock),
      set(currentTranslateX, translateXPerFrame),
      set(prevDragX, dragX),
      currentTranslateX,
    ],
    cond(neq(gestureState, -1), [
      set(prevDragX, 0),
      set(
        currentTranslateX,
        cond(
          defined(currentTranslateX),
          [
            cond(clockRunning(clock), 0, updateSpringState),

            spring(clock, animationState, springConfig),

            cond(animationState.finished, stopClock(clock)),

            animationState.position,
          ],
          0
        )
      ),
    ])
  )

  const diffDistanceYPerFrame = sub(dragY, prevDragY)
  const translateYPerFrame = add(currentTranslateY, diffDistanceYPerFrame)

  const translateY = block([
    cond(
      isMoving,
      [set(currentTranslateY, translateYPerFrame), set(prevDragY, dragY)],
      [set(prevDragY, 0)]
    ),
    currentTranslateY,
  ])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <PanGestureHandler
          maxPointers={1}
          minDist={10}
          onGestureEvent={onPanGestureEvent}
          onHandlerStateChange={onPanGestureEvent}>
          <Animated.View
            style={[
              styles.profileWrapper,
              {transform: [{translateX}, {translateY}]},
            ]}
          />
        </PanGestureHandler>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
  profileWrapper: {
    position: 'absolute',
    alignSelf: 'center',
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: ITEM_SIZE / 2,
    backgroundColor: 'green',
    margin: ITEM_SIZE / 2,
  },
})

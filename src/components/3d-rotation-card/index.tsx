import React, {useState, ReactElement, useMemo} from 'react'
import {StyleSheet, Dimensions, SafeAreaView} from 'react-native'
import {TapGestureHandler, State} from 'react-native-gesture-handler'
import Animated, {
  Value,
  set,
  useCode,
  debug,
  block,
  interpolate,
  Extrapolate,
  concat,
  Clock,
  clockRunning,
  startClock,
  cond,
  timing,
  Easing,
  stopClock,
} from 'react-native-reanimated'
import {Card, Cards, CARD_HEIGHT, CARD_WIDTH} from '../common/Card'

const containerHeight = Dimensions.get('window').height
const containerWidth = Dimensions.get('window').width

const cards = [
  {
    type: Cards.Card1,
  },
  {type: Cards.Card3},
]

// from react-native-redash [https://github.com/wcandillon/can-it-be-done-in-react-native/blob/e48987ee1b504c227bb9824ffccabe36a581978b/season2/google-chrome-refresh/components/AnimationHelpers.ts]
export function runTiming(clock: Clock, value: number, dest: number): any {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  }

  const config = {
    duration: 500,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  }

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position,
  ])
}

export const Rotation3DCard = (): ReactElement => {
  const [isRotate, setIsRotate] = useState<boolean>(false)

  const {clock, isRotating, x} = useMemo(
    () => ({
      x: new Value(0),
      clock: new Clock(),
      isRotating: new Value(0),
    }),
    []
  )

  const rotateYAsDeg = interpolate(x, {
    inputRange: [0, 1],
    outputRange: [0, 180],
    extrapolate: Extrapolate.CLAMP,
  })

  useCode(
    () =>
      block([
        cond(
          isRotating,
          block([debug('isRotating true', x), set(x, runTiming(clock, 0, 1))]),

          block([debug('isRotating false', x), set(x, runTiming(clock, 1, 0))])
        ),
      ]),
    []
  )

  return (
    <SafeAreaView style={styles.container}>
      <TapGestureHandler
        onHandlerStateChange={({nativeEvent: {state}}) => {
          let newState
          if (state === State.ACTIVE) {
            newState = !isRotate
            setIsRotate(newState)
            isRotating.setValue(newState ? 1 : 0)
          }
        }}>
        <Animated.View
          style={[
            styles.imageContainer,
            {transform: [{perspective: 10000}, {rotateY: concat(rotateYAsDeg, 'deg')}]},
          ]}>
          <Card type={cards[0].type} />
        </Animated.View>
      </TapGestureHandler>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  imageContainer: {
    ...StyleSheet.absoluteFillObject,
    top: (containerHeight - CARD_HEIGHT) / 2,
    left: (containerWidth - CARD_WIDTH) / 2,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },

  slider: {
    top: 100,
  },
})

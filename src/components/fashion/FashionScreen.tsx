import React, {ReactElement, useState, useRef} from 'react'
import {
  ScrollView,
  Animated,
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Easing,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'

const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = Dimensions.get('window')
const PADDING = 15
const CARD_WIDTH = WINDOW_WIDTH - PADDING * 2
const CARD_HEIGHT = CARD_WIDTH * 1.5
const PERSPECTIVE = 1000

type CardProps = {
  rotateY: any
}

export const Card = ({rotateY}: CardProps): ReactElement => {
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.card,
          {
            transform: [
              {perspective: PERSPECTIVE},
              // {translateX: CARD_WIDTH / 2},
              // TODO:
              // dynamic value of rotateY
              {rotateY: rotateY},
              // {rotateY: 0},
              // {translateX: -CARD_WIDTH / 2},
            ],

            // borderRadius: CARD_WIDTH,
          },
        ]}></Animated.View>
    </View>
  )
}

const ELEMENT_SIZE = 10

export const FashionScreen = () => {
  const offsetX = new Animated.Value(0)

  const onScrollEvent = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            x: offsetX,
          },
        },
      },
    ],
    {useNativeDriver: true}
  )

  return (
    <SafeAreaView style={styles.safearea}>
      <Animated.ScrollView
        onScroll={onScrollEvent}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
          let offset = event.nativeEvent.contentOffset

          Animated.sequence([
            Animated.timing(offsetX, {
              toValue: offset.x + 20,
              duration: 100,
              easing: Easing.elastic(1),
              useNativeDriver: true,
            }),
            Animated.timing(offsetX, {
              toValue: offset.x,
              duration: 300,
              easing: Easing.elastic(1),
              useNativeDriver: true,
            }),
          ]).start()
        }}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        pagingEnabled
        horizontal>
        {[...Array(ELEMENT_SIZE).keys()].map((v, i) => {
          const isLeft = (i + 1) * WINDOW_WIDTH - WINDOW_WIDTH
          const isMiddle = isLeft + WINDOW_WIDTH / 2
          const isRight = isLeft + WINDOW_WIDTH
          const isDisappeaing = isMiddle - (isMiddle - isLeft) / 2
          const isAppearing = isMiddle + (isMiddle - isLeft) / 2

          const rotateY = offsetX.interpolate({
            inputRange: [isLeft, isDisappeaing, isMiddle, isAppearing, isRight],
            outputRange: [0, 0.2, 0, 1, 0],
          })

          return <Card key={`card ${i}`} rotateY={rotateY} />
        })}
      </Animated.ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: 'green',
  },

  container: {
    flex: 1,
    backgroundColor: '#848ccf',
    padding: PADDING,
  },

  card: {
    backgroundColor: '#be5683',
    borderRadius: 10,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

import React, {ReactElement} from 'react'
import {StyleSheet, SafeAreaView, Platform} from 'react-native'
import Animated, {Extrapolate, interpolate, divide, sub} from 'react-native-reanimated'
import {usePanGestureHandler, diffClamp, withDecay} from 'react-native-redash'
import {PanGestureHandler} from 'react-native-gesture-handler'
import {Story, CARD_HEIGHT, CARD_MARGIN, CARD_WIDTH, CARD_CONTAINER_WIDTH} from './Story'

type FacebookStoryScrollProps = {}

const STORIES = [
  {source: require('./img/profile.jpg'), name: 'Sochetra', profileURL: ''},
  {source: require('./img/story1.jpg'), name: 'Sochetra', profileURL: ''},
  {source: require('./img/story2.jpg'), name: 'Fai', profileURL: ''},
  {source: require('./img/story3.jpg'), name: 'Chanty', profileURL: ''},
  {source: require('./img/story4.jpg'), name: 'Kim Hour', profileURL: ''},
  {source: require('./img/story5.jpg'), name: 'Devith', profileURL: ''},
  {source: require('./img/story6.jpg'), name: 'Soben', profileURL: ''},
]

export const FacebookStoryScroll = (_: FacebookStoryScrollProps): ReactElement => {
  const {gestureHandler, translation, velocity, state} = usePanGestureHandler()
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
        <Animated.View style={styles.container}>
          {STORIES.map((s, i) => {
            const isLeft = 0
            const isAppearring = CARD_CONTAINER_WIDTH * STORIES.length
            const isDisappearing = -CARD_CONTAINER_WIDTH
            const isRight = CARD_CONTAINER_WIDTH * (STORIES.length - 1)

            const translateX = interpolate(x, {
              inputRange: [-CARD_CONTAINER_WIDTH * i, 0],
              outputRange: [-CARD_CONTAINER_WIDTH * i, 0],
            })

            const transformHeight = interpolate(x, {
              inputRange: [isDisappearing, isLeft, isRight, isAppearring],
              outputRange: [50, CARD_HEIGHT, CARD_HEIGHT, CARD_HEIGHT],
              extrapolate: Extrapolate.CLAMP,
            })

            const tranformOwnProfileHeight = interpolate(x, {
              inputRange: [isDisappearing, isLeft, isRight, isAppearring],
              outputRange: [
                40,
                (CARD_HEIGHT * 60) / 100,
                (CARD_HEIGHT * 60) / 100,
                (CARD_HEIGHT * 60) / 100,
              ],
              extrapolate: Extrapolate.CLAMP,
            })

            const tranformOwnStoryContainerWidth = interpolate(x, {
              inputRange: [isDisappearing, isLeft, isRight, isAppearring],
              outputRange: [50, CARD_WIDTH, CARD_WIDTH, CARD_WIDTH],
              extrapolate: Extrapolate.CLAMP,
            })

            const tranformOwnProfileWidth = interpolate(x, {
              inputRange: [isDisappearing, isLeft, isRight, isAppearring],
              outputRange: [40, CARD_WIDTH, CARD_WIDTH, CARD_WIDTH],
              extrapolate: Extrapolate.CLAMP,
            })

            const tranformOwnProfileMarginTop = interpolate(x, {
              inputRange: [isDisappearing, isLeft, isRight, isAppearring],
              outputRange: [4, 0, 0, 0],
              extrapolate: Extrapolate.CLAMP,
            })

            const transformBorderRadius = interpolate(x, {
              inputRange: [isDisappearing, isLeft, isRight, isAppearring],
              outputRange: [25, 10, 10, 10],
              extrapolate: Extrapolate.CLAMP,
            })

            const transformMarginTopAndBottomLeftStoryContainer = interpolate(x, {
              inputRange: [isDisappearing, isLeft, isRight, isAppearring],
              outputRange: [0, 10, 10, 10],
              extrapolate: Extrapolate.CLAMP,
            })

            const tranformCreateStoryFontSize = interpolate(x, {
              inputRange: [isDisappearing, isLeft, isRight, isAppearring],
              outputRange: [3, 14, 14, 14],
              extrapolate: Extrapolate.CLAMP,
            })

            const tranformCreateStoryTextOpacity = interpolate(x, {
              inputRange: [isDisappearing, isLeft],
              outputRange: [0, 1],
              extrapolate: Extrapolate.CLAMP,
            })

            const transformMarginLeftStory = interpolate(x, {
              inputRange: [isDisappearing, isLeft, isRight, isAppearring],
              outputRange: [-10, 0, 0, 0],
              extrapolate: Extrapolate.CLAMP,
            })
            const transformPlusIconScale = interpolate(x, {
              inputRange: [isDisappearing, isLeft, isRight, isAppearring],
              outputRange: [0.5, 1, 1, 1],
              extrapolate: Extrapolate.CLAMP,
            })

            const transformPlusIconTranslateX = interpolate(x, {
              inputRange: [isDisappearing, isLeft, isRight, isAppearring],
              outputRange: [20, 0, 0, 0],
              extrapolate: Extrapolate.CLAMP,
            })

            const transformPlusIconTranslateY = interpolate(x, {
              inputRange: [isDisappearing, isLeft, isRight, isAppearring],
              outputRange: [-10, 0, 0, 0],
              extrapolate: Extrapolate.CLAMP,
            })

            const transformPlusIconTop = interpolate(transformHeight, {
              inputRange: [isDisappearing, isLeft, isRight, isAppearring],
              outputRange: [
                sub(divide(transformHeight, 2), 10),
                sub(divide(transformHeight, 2), 10),
                divide(transformHeight, 2),
                divide(transformHeight, 2),
              ],
              extrapolate: Extrapolate.CLAMP,
            })

            return (
              <Animated.View
                key={i}
                style={[
                  styles.storyItemContainer,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    zIndex: -i,
                    transform: [{translateX}],
                    marginLeft: i === 0 ? transformMarginLeftStory : 0,
                    height: i === 0 ? transformHeight : CARD_HEIGHT,
                  },
                ]}>
                <Story
                  index={i}
                  source={s.source}
                  name={s.name}
                  profileContainerStyle={{
                    borderTopRightRadius: transformBorderRadius,
                    borderBottomRightRadius: transformBorderRadius,
                    marginTop: tranformOwnProfileMarginTop,
                  }}
                  profileImageStyle={{
                    borderTopRightRadius: transformBorderRadius,
                    borderTopLeftRadius: transformBorderRadius,
                    borderBottomLeftRadius: transformBorderRadius,
                    borderBottomRightRadius: transformBorderRadius,
                    width: tranformOwnProfileWidth,
                    height: tranformOwnProfileHeight,
                  }}
                  containerStyle={{
                    borderTopRightRadius: transformBorderRadius,
                    borderBottomRightRadius: transformBorderRadius,

                    borderTopLeftRadius: transformMarginTopAndBottomLeftStoryContainer,
                    borderBottomLeftRadius: transformMarginTopAndBottomLeftStoryContainer,
                    width: i === 0 ? tranformOwnStoryContainerWidth : CARD_WIDTH,
                  }}
                  textStyle={{
                    fontSize: tranformCreateStoryFontSize,
                    opacity: tranformCreateStoryTextOpacity,
                  }}
                  plusIconContainerStyle={{
                    transform: [
                      {scale: transformPlusIconScale},
                      {translateX: transformPlusIconTranslateX},
                      {translateY: transformPlusIconTranslateY},
                    ],
                    top: transformPlusIconTop,
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
    paddingTop: Platform.OS === 'android' ? 50 : 0,
  },

  container: {
    flexDirection: 'row',
    padding: 5,
    paddingBottom: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  storyItemContainer: {
    display: 'flex',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    margin: 5,
  },
})

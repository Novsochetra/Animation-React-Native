import React, {ReactElement, useState} from 'react'
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {
  BottomTabBarOptions,
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import Entypo from '@expo/vector-icons/Entypo'
import {opacity} from 'react-native-redash'
import {color} from 'react-native-reanimated'

const ICON_SIZE = 30

const HomeScreen = (): React.ReactElement => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Home!</Text>
    </View>
  )
}

const ProfileScreen = (): React.ReactElement => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Profile !</Text>
    </View>
  )
}

const SettingsScreen = (): React.ReactElement => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  )
}

const Tab = createBottomTabNavigator()
const AnimateIcon = Animated.createAnimatedComponent(Entypo)

export const AnimatedBottomTab = (): React.ReactElement => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(tabbarProps: BottomTabBarProps<BottomTabBarOptions>) => (
          <Tabbar {...tabbarProps} />
        )}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Setting" component={SettingsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const CIRCLE_SIZE = ICON_SIZE * 2
const TABBAR_HEIGHT = 90

export const Tabbar = ({
  state,
  navigation,
}: BottomTabBarProps<BottomTabBarOptions>): React.ReactElement => {
  const totalWidth = Dimensions.get('window').width
  const tabWidth = totalWidth / state.routes.length
  const [translateValue] = React.useState(new Animated.Value(0))
  const [circleTranX] = useState(new Animated.Value(0))
  const [circleOpacity] = useState(new Animated.Value(0))
  const [animatedRouteIndexValue] = useState(new Animated.Value(0))
  const [routeNameTranY] = useState(new Animated.Value(0))
  const [circleScale] = useState(new Animated.Value(1))
  const [opacityRoutes] = useState([
    {opacity: new Animated.Value(1), translateY: new Animated.Value(0)},
    {opacity: new Animated.Value(0), translateY: new Animated.Value(0)},
    {opacity: new Animated.Value(0), translateY: new Animated.Value(0)},
  ])

  return (
    <Animated.View style={styles.tabbarContainer}>
      <Slider progress={translateValue} width={tabWidth - 20} />

      <Animated.View
        style={[
          styles.circle,
          {
            left: (tabWidth - CIRCLE_SIZE) / 2,
            opacity: circleOpacity,
            transform: [{translateX: circleTranX}, {scale: circleScale}],
          },
        ]}
      />
      <View style={{flexDirection: 'row'}}>
        {state.routes.map((route, index) => {
          let iconName = ''

          console.log('ROEUTE: ', route)
          if (route.name === 'Home') {
            iconName = 'home'
          } else if (route.name === 'Setting') {
            iconName = 'cog'
          } else if (route.name === 'Profile') {
            iconName = 'user'
          }

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })

            const animateRouteOpacity = (value1, value2, value3) => {
              Animated.parallel([
                Animated.timing(opacityRoutes[0].opacity, {
                  toValue: value1,
                }),
                Animated.timing(opacityRoutes[1].opacity, {
                  toValue: value2,
                }),
                Animated.timing(opacityRoutes[2].opacity, {
                  toValue: value3,
                }),
              ]).start()
            }

            const animateRouteTranslateY = (value1, value2, value3) => {
              Animated.parallel([
                Animated.timing(opacityRoutes[0].translateY, {
                  toValue: value1,
                }),
                Animated.timing(opacityRoutes[1].translateY, {
                  toValue: value2,
                }),
                Animated.timing(opacityRoutes[2].translateY, {
                  toValue: value3,
                }),
              ]).start()
            }

            const isFocused = state.index === index

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name)
            }

            if (index === 0) {
              animateRouteOpacity(1, 0, 0)
              animateRouteTranslateY(-10, 0, 0)
            } else if (index === 1) {
              animateRouteOpacity(0, 1, 0)
              animateRouteTranslateY(0, -10, 0)
            } else if (index === 2) {
              animateRouteOpacity(0, 0, 1)
              animateRouteTranslateY(0, 0, -10)
            }

            Animated.sequence([
              Animated.parallel([
                Animated.spring(routeNameTranY, {
                  toValue: -10,
                  velocity: 10,
                  useNativeDriver: true,
                }),

                Animated.spring(animatedRouteIndexValue, {
                  toValue: index,
                  velocity: 10,
                  useNativeDriver: true,
                }),

                Animated.timing(circleTranX, {
                  toValue: index * tabWidth,
                  duration: 500,
                  useNativeDriver: true,
                }),

                Animated.spring(translateValue, {
                  toValue: index * tabWidth,
                  velocity: 10,
                  delay: 250,
                  useNativeDriver: true,
                }),

                Animated.timing(circleScale, {
                  toValue: 1.5,
                  duration: 1000,
                  useNativeDriver: true,
                }),

                Animated.sequence([
                  Animated.spring(circleOpacity, {
                    toValue: 0.3,
                    useNativeDriver: true,
                    friction: 100,
                  }),

                  Animated.spring(circleOpacity, {
                    toValue: 0,
                    useNativeDriver: true,
                    friction: 100,
                  }),

                  Animated.spring(circleScale, {
                    toValue: 1,
                    useNativeDriver: true,
                    friction: 100,
                  }),
                ]),
              ]),
            ]).start()
          }

          const iconStyle =
            state.index === index
              ? {
                  color: 'rgb(32, 45, 235)',
                  transform: [
                    {
                      scale: opacityRoutes[index].translateY.interpolate({
                        inputRange: [-10, -5, 0],
                        outputRange: [1.2, 0.8, 1.2],
                      }),
                    },
                  ],
                }
              : {color: 'rgb(121, 135, 152)'}

          return (
            <TouchableOpacity
              key={`bottomtab.${route.key}`}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={onPress}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}>
                <AnimateIcon
                  name={iconName}
                  size={ICON_SIZE}
                  style={iconStyle}
                />
              </View>
              <Animated.Text
                style={{
                  color: 'rgb(121, 135, 152)',
                  fontWeight: '600',
                  position: 'absolute',
                  bottom: 0,
                  opacity: opacityRoutes[index].opacity,
                  transform: [{translateY: opacityRoutes[index].translateY}],
                }}>
                {route.name}
              </Animated.Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </Animated.View>
  )
}

const Slider = ({progress, width}): ReactElement => {
  return (
    <Animated.View
      style={[
        styles.slider,
        {
          transform: [{translateX: progress}],
          width,
        },
      ]}
    />
  )
}

const styles = StyleSheet.create({
  tabbarContainer: {
    width: Dimensions.get('window').width,
    height: TABBAR_HEIGHT,
    backgroundColor: 'white',
    borderRadius: 20,
    // borderWidth: 1,

    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 10,
    position: 'absolute',
    bottom: 0,
  },

  slider: {
    height: 5,
    position: 'absolute',
    top: 0,
    left: 10,
    backgroundColor: '#202DEB',
    borderRadius: 10,
  },

  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    position: 'absolute',
    // backgroundColor: '#798798',
    backgroundColor: '#B6BEC9',
    borderRadius: CIRCLE_SIZE / 2,
    top: (TABBAR_HEIGHT - CIRCLE_SIZE) / 2,
  },
})

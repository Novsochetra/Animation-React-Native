import React, {ReactElement, useMemo} from 'react'
import {View, Text, SafeAreaView, StyleSheet, FlatList} from 'react-native'
import {Header} from './Header'
import {Card, CARD_WIDTH, CARD_MARGIN} from './Card'
import {IconButton} from './IconButton'
import {Card2} from './Card2'

type HomeScreenProps = {}

export type ISlider = {
  id: number
  brandName: string
  productName: string
  price: string
  productURL: any
  backgroudColor: string
}

export const THEME_COLOR = {
  purple: '#3080e8',
  gray1: '#EAEBF1',
  gray2: '#B5BDCD',
  gray3: '#1C284C',
  green1: '#107c91',
  green2: '#109173',
  red: '#E21326',
}

const SAMPLE_SLIDEER_DATA: ISlider[] = [
  {
    id: 1,
    brandName: 'Nike',
    productName: 'EPIC-REACT',
    price: '$130.00',
    productURL: require('./assets/shoe1.png'),
    backgroudColor: THEME_COLOR.purple,
  },
  {
    id: 2,
    brandName: 'Nike',
    productName: 'EPIC-REACT',
    price: '$130.00',
    backgroudColor: THEME_COLOR.green1,
    productURL: require('./assets/shoe1.png'),
  },
  {
    id: 3,
    brandName: 'Nike',
    productName: 'EPIC-REACT',
    price: '$130.00',
    backgroudColor: THEME_COLOR.gray2,
    productURL: require('./assets/shoe1.png'),
  },
  {
    id: 4,
    brandName: 'Nike',
    productName: 'EPIC-REACT',
    price: '$130.00',
    backgroudColor: THEME_COLOR.green2,
    productURL: require('./assets/shoe1.png'),
  },
  {
    id: 5,
    brandName: 'Nike',
    productName: 'EPIC-REACT',
    price: '$130.00',
    backgroudColor: THEME_COLOR.purple,
    productURL: require('./assets/shoe1.png'),
  },
]

export const HomeScreen = (_: HomeScreenProps): ReactElement => {
  const renderItem = ({item, index}: {item: ISlider; index: number}): ReactElement => {
    return <Card key={`card-${index}`} item={item} />
  }

  const renderItem2 = ({item, index}: {item: ISlider; index: number}): ReactElement => {
    return <Card2 key={`card-${index}`} item={item} />
  }
  const snapToOffsets = useMemo(
    () => [...Array(5).keys()].map((_, i) => i * (CARD_WIDTH + CARD_MARGIN * 2)),
    []
  )
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Header />

        <View style={styles.contentWrapper}>
          <FlatList
            data={SAMPLE_SLIDEER_DATA}
            renderItem={renderItem}
            keyExtractor={(_, index: number) => `item-${index}`}
            showsHorizontalScrollIndicator={false}
            snapToOffsets={snapToOffsets}
            pagingEnabled
            horizontal
            decelerationRate="fast"
          />
        </View>

        <View style={styles.footer}>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionFooterTitle}>More</Text>
            <IconButton iconName="arrow-right" btnContainerStyle={{backgroundColor: '#fff'}} />
          </View>
          <FlatList
            data={SAMPLE_SLIDEER_DATA}
            renderItem={renderItem2}
            keyExtractor={(_, index: number) => `item-${index}`}
            showsHorizontalScrollIndicator={false}
            snapToOffsets={snapToOffsets}
            pagingEnabled
            horizontal
            decelerationRate="fast"
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },

  contentWrapper: {
    // backgroundColor: 'blue',
    height: 350,
    paddingVertical: 15,
  },

  footer: {
    marginTop: 15,
    height: 250,
  },

  sectionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  sectionFooterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})

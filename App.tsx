import React, {ReactElement} from 'react'
import {} from 'react-native'
// import {ScrollViewImagesGallery} from './src/components/scrollview-images-gallery'
// import {ScrollTransformCard} from './src/components/scroll-transform-card'
// import {ScrollStackCard} from './src/components/scroll-stack-card'
// import {FacebookStoryScroll} from './src/components/facebook-story-scroll'
// import {Rotation3DCard} from './src/components/3d-rotation-card'
import {InstagramStoryScroll} from './src/components/instagram-story-scroll'
import {FashionScreen} from './src/components/fashion/FashionScreen'

export const App = (): ReactElement => {
  // return <ScrollViewImagesGallery />
  // return <ScrollTransformCard />
  // return <ScrollStackCard />
  // return <FacebookStoryScroll />
  // return <Rotation3DCard />
  // return <InstagramStoryScroll />
  return <FashionScreen />
}

export default App

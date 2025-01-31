import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'
import React from 'react'
import { useState, useCallback } from 'react'
import icons from '../constants/icons'

const zoomIn = {
  0:{scale:0.9},
  1:{scale:1}
}

const zoomOut = {
  0:{scale:1},
  1:{scale:0.9}
}

const TrendingItem = ({activeItem, item}) => {
  const [play, setPlay] = useState(false)

  
  return(
    <Animatable.View className='mr-10' animation={activeItem === item.$id ? zoomIn : zoomOut} duration={500}>
      {play ? (
        <Text className="text-white">Playing</Text>
      ) : (
        <TouchableOpacity className="relative justify-center mx-2 items-center" activeOpacity={0.7} onPress={() => setPlay(true)}>
          <ImageBackground source={{uri:item.thumbnail}} className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black-40" resizeMode='cover'/>
          <Image source={icons.play} className="absolute" style={{width:'3rem', height:'3rem'}} resizeMode='contain'/>
        </TouchableOpacity>
      )}
        
    </Animatable.View>
  )
}

const Trending = ({posts}) => {
  const [activeItem, setActiveItem] = useState(posts[1])

  const viewableItemsChanged = useCallback(({viewableItems}) => {
    if(viewableItems.length > 0){
      setActiveItem(viewableItems[0].key)
    }

  }, [])

  return (
    <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
            <TrendingItem activeItem={activeItem} item={item}/>
        )}
        horizontal
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{itemVisiblePercentThreshold: 70}}
        contentOffset={{x:170}}
    />
  )
}

export default Trending
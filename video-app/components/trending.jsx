import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import React, { useState, useCallback } from 'react';
import icons from '../constants/icons';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
// import { WebView } from 'react-native-webview';


const zoomIn = {
  0: { scale: 0.9 },
  1: { scale: 1 },
};

const zoomOut = {
  0: { scale: 1 },
  1: { scale: 0.9 },
};

const TrendingItem = ({ activeItem, item }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const player = useVideoPlayer(item.video, (player) => {
    player.loop = false;
  });

  useEvent(player, 'playingChange', (event) => {
    if (player && event) {
      setIsPlaying(event.playing);
    }
  });
  useEvent(player, 'ended', () => {
    if (player) {
      setIsPlaying(false); 
    }
  });

  return (
    <Animatable.View className='mr-10' animation={activeItem === item.$id ? zoomIn : zoomOut} duration={500}>
      {isPlaying ? (
        <VideoView player={player} allowsFullscreen className='w-52 h-72 rounded-[35px] mt-3 bg-white/10' 
        style={{width:'13rem', height:'18rem',borderRadius: 35,
          marginTop: 12,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',}}/>
      ) : (
        <TouchableOpacity
          className='relative justify-center mx-2 items-center'
          activeOpacity={0.7}
          onPress={() => {setIsPlaying(true)
          player.play()}}>
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black-40'
            resizeMode='cover'
          />
          <Image source={icons.play} className='absolute' style={{ width: '3rem', height: '3rem' }} resizeMode='contain' />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const viewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  }, []);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => <TrendingItem activeItem={activeItem} item={item} />}
      horizontal
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170 }}
    />
  );
};

export default Trending;

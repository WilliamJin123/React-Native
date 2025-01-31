import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import icons from '../constants/icons'
import { useState } from 'react'
import { useVideoPlayer, VideoView } from 'expo-video'
import { useEvent } from 'expo'


const VideoCard = ({ video: { title, thumbnail, video, creator: { username, avatar } } }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const player = useVideoPlayer(video, (player) => {
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
        <View className="flex-col items-start px-4 mb-14 w-full">
            <View className="flex-row gap-3 items-start space-between w-full">
                <View className=" items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                        <Image source={{ uri: avatar }} className="w-full h-full rounded-lg" resizeMode="cover" />
                    </View>
                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text className="text-white font-psemibold text-sm" numberOfLines={1}>{title}</Text>
                        <Text className="text-gray-100 text-xs font-pregular" numberOfLines={1}>{username}</Text>
                    </View>
                </View>

                <View className="pt-2">
                    <Image source={icons.menu} style={{ width: '1rem', height: '1rem' }} resizeMode='contain' />
                </View>
            </View>
            {isPlaying ? (
                <VideoView player={player} allowsFullscreen className='w-full h-96 rounded-xl mt-3 bg-white/10'
                    style={{
                        width: '100%', height: 'calc(24rem * 0.9)', borderRadius: '0.75rem',
                        marginTop: '3rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }} />
            ) : (
                <TouchableOpacity activeOpacity={0.7} onPress={() => {
                    setIsPlaying(true)
                    player.play()}} className='w-full h-96 rounded-xl mt-3 relative justify-center items-center'>
                    <Image source={{ uri: thumbnail }} className="w-full h-[85%] rounded-xl mt-3" resizeMode='cover' />
                    <Image source={icons.play} className="absolute" resizeMode="contain" style={{ width: '3rem', height: '3rem' }} />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default VideoCard
import { View, Text, Image } from 'react-native'
import React from 'react'
import images from '../constants/images'
import CustomButton from './customButton'
import {router} from 'expo-router'
const EmptyState = ({title, subtitle}) => {
    return (
        <View className="justify-center items-center px-4">
            <Image source={images.empty} style={{ width: 270, height: 215 }} resizeMode='contain' className="my-2"/>
            <Text className="text-xl text-center mt-2 font-psemibold text-white my-2">{title}</Text>
            <Text className="font-pmedium text-sm text-gray-100 my-2">{subtitle}</Text>

            <CustomButton title='Create video' handlePress={() => router.push('/create')} containerStyles='w-full my-5'/>
        </View>
    )
}

export default EmptyState
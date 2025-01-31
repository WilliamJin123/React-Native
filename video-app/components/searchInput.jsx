import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState } from 'react'
import icons from '../constants/icons'
const SearchInput = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {

    const [showPassword, setShowPassword] = useState(false)
  return (
    
      <View className="border-2 border-black-200 rounded-2xl w-full h-16 px-4 bg-black-100 focus-within:border-secondary 
      flex flex-row items-center space-x-4">
        <TextInput className="text-base mt-0.5 flex-1 text-white font-pregular border-none outline-none"
        value={value}
        placeholder="Search for a video topic"
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        />
            <TouchableOpacity>
                <Image source={icons.search} resizeMode='contain' style={{width:'2rem', height:'2rem'}}/>
            </TouchableOpacity>
        
      </View>
  )
}

export default SearchInput
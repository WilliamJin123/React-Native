import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState } from 'react'
import icons from '../constants/icons'
const FormField = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {

    const [showPassword, setShowPassword] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium mx-2 ">{title}</Text>
      <View className="border-2 border-black-200 rounded-2xl w-full h-16 px-4 bg-black-100 focus-within:border-secondary flex flex-row items-center">
        <TextInput className="flex-1 text-white font-psemibold h-16 focus:border-none focus:outline-none text-base text-left"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === 'Password' && !showPassword}
        />

        {title==='Password' && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image source={showPassword ? icons.eyeHide : icons.eye} style={{height:"1.5rem", width:"1.5rem"}} resizeMode='contain'/>
            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField
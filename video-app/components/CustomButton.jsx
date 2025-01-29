import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = () => {
  return (
    <TouchableOpacity className={`bg-secondary min-h-[62px] justify-center items-center`}>
      <Text>CustomButton</Text>
    </TouchableOpacity>
  )
}

export default CustomButton
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import { useState } from 'react'
import icons from '../constants/icons'
import { router, usePathname } from 'expo-router'
const SearchInput = ({initialQuery}) => {
  const pathName = usePathname()
  const [query, setQuery] = useState(initialQuery || "")
  return (
    
      <View className="border-2 border-black-200 rounded-2xl w-full h-16 px-4 bg-black-100 focus-within:border-secondary 
      flex flex-row items-center space-x-4">
        <TextInput className="text-base mt-0.5 flex-1 text-white font-pregular border-none outline-none"
        value={query}
        placeholder="Search for a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
        />
            <TouchableOpacity onPress={() => {
              if(!query){return Alert.alert('Missing query', "Please input something to search results across database")
              }
              if(pathName.startsWith('/search')){
                router.setParams({query})
              }else router.push(`/search/${query}`)
              }}>
                <Image source={icons.search} resizeMode='contain' style={{width:'2rem', height:'2rem'}}/>
            </TouchableOpacity>
        
      </View>
  )
}

export default SearchInput
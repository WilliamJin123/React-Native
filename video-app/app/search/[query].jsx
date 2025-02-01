import { View, Text, SafeAreaView, FlatList, } from 'react-native'
import React from 'react'

import SearchInput from '../../components/searchInput'

import EmptyState from '../../components/emptyState'
import {  useEffect } from 'react'
import { searchPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/videoCard'
import { useGlobalContext } from '../../context/globalProvider'
import { useLocalSearchParams } from 'expo-router'



const Search = () => {
  const { user, setUser } = useGlobalContext()


  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const result = await getCurrentUser()
  //       setUser(result)
  //     }catch(err){
  //       throw new Error(err)
  //     }
  //   }
  //   getUser()

  // }, [])


  console.log(user)
  const { query } = useLocalSearchParams()

  const { data: posts, refetch } = useAppwrite(() => searchPosts(query))

  useEffect(() => {
    refetch()
  }, [query])


  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        className=""
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">Seach Results</Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} />
            </View>
            
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No Videos Found" subtitle="No videos found for this search query"/>
        )}
      />
    </SafeAreaView>
  )
}

export default Search
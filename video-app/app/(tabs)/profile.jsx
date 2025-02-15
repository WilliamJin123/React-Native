import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image, } from 'react-native'
import React from 'react'

import SearchInput from '../../components/searchInput'
import Loader from '../../components/loader'
import EmptyState from '../../components/emptyState'
import { useEffect } from 'react'
import { getUserPosts, searchPosts, signOut } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/videoCard'
import { useGlobalContext } from '../../context/globalProvider'
import { router, useLocalSearchParams } from 'expo-router'
import icons from '../../constants/icons'
import InfoBox from '../../components/infoBox'

const Profile = () => {
  const { user, setUser, setIsLoggedIn, isLoading } = useGlobalContext()



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

  const { data: posts } = useAppwrite(() => getUserPosts(user.$id))

  console.log(posts)

  const logout = async () => {
    await signOut()
    setUser(null)
    setIsLoggedIn(false)

    router.replace('/sign-in')
  }

  return (
    <SafeAreaView className="bg-primary h-full">
   <Loader isLoading={isLoading}/>
      <FlatList
        className=""
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity className="w-full items-end mb-10" onPress={logout}>
              <Image source={icons.logout} resizeMode='contain' style={{ width: '1.5rem', height: '1.5rem' }} />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image source={{ uri: user?.avatar }} className="w-[90%] h-[90%] rounded-lg" resizeMode='cover' />
            </View>

            <InfoBox title={user?.username} containerStyles='mt-5' titleStyles='text-lg' />
            <View className="mt-5 flex-row">
              <InfoBox title={posts.length || 0} subtitle="Posts" containerStyles='mr-10' titleStyles='text-xl' />
              <InfoBox title="1.2k" subtitle="Followers" titleStyles='text-lg' />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No Videos Found" subtitle="No videos found for this search query" />
        )}
      />
    </SafeAreaView>
  )
}

export default Profile
import { View, Text, SafeAreaView, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React from 'react'
import images from '../../constants/images'
import SearchInput from '../../components/searchInput'
import Trending from '../../components/trending'
import EmptyState from '../../components/emptyState'
import { useState, useEffect } from 'react'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/videoCard'
import { getCurrentUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/globalProvider'



const Home = () => {
  const {user, setUser} = useGlobalContext()


  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await getCurrentUser()
        setUser(result)
      }catch(err){
        throw new Error(err)
      }
    }
    getUser()
    
  }, [])


  console.log(user)
  const {data: posts, refetch} = useAppwrite(getAllPosts)
  // console.log(posts)

  const {data: latestPosts} = useAppwrite(getLatestPosts)
  // console.log(latestPosts)


  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true)
    try{
      await refetch()
    }catch(err){
      Alert.alert('Error', err.message)
    }finally{
      setRefreshing(false)
    }
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        className=""
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <VideoCard video={item}/>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
                <Text className="text-2xl font-psemibold text-white">{user?.username ?? 'Guest'}</Text>
              </View>
              <View className="mt-1.5">
                <Image source={images.logoSmall} style={{width:'3rem', height:'2rem'}} resizeMode='contain'/>
              </View>
            </View>

            <SearchInput/>

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">Latest Videos</Text>

              <Trending posts={latestPosts ?? []}/>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (<EmptyState title="No Videos Found" subtitle="Be the first one to upload a video" />)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default Home
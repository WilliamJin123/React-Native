import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/formField'
import { useState } from 'react'
import icons from '../../constants/icons'
import { VideoView, useVideoPlayer } from 'expo-video'
import CustomButton from '../../components/customButton'
import * as DocumentPicker from 'expo-document-picker'
import { router } from 'expo-router'
import { createVideo } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/globalProvider'

const Create = () => {
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: ''
  })

  const {user} = useGlobalContext()

  const player = useVideoPlayer(form.video, (player) => {
    player.loop = false;
  });

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: selectType === 'image' ? ['image/png', 'image/jpg', 'image/jpeg'] : ['video/mp4', 'video/gif']
    })
    if (!result.canceled) {
      const file = result.assets ? result.assets[0] : result;
      if (selectType === 'image') {
        setForm({ ...form, thumbnail: file })
      }
      if (selectType === 'video') {
        setForm({ ...form, video: file })
      }
    } else {
      setTimeout(() => {
        Alert.alert('Document picked', JSON.stringify(result, null, 2))
      }, 100)
    }
  }


  const submitVideo = async () => {
    if (!form.prompt || !form.title || !form.thumbnail || !form.video) {
      return Alert.alert('Please fill in all the fields')
    }
    setUploading(true)
    try {
      await createVideo({
        ...form, userId: user.$id
      })
      Alert.alert('Success', 'Post uploaded succesfully')
      router.push('/home')
    } catch (err) {
      Alert.alert('Error', err.message)
    } finally {
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: ''
      })

      setUploading(false)
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>
        <FormField title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles={'mt-10'}
        />

        <View className="mt-7 space-y-2 ">
          <Text className="text-base text-gray-100 font-pmedium">Upload Video</Text>
          <TouchableOpacity onPress={() => openPicker('video')}>
            {form.video ? (
              <VideoView player={player} allowsFullscreen className="w-full h-64 rounded-2xl"
                style={{ width: '100%', height: '16rem', borderRadius: '1rem' }} />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image source={icons.upload} resizeMode='contain' style={{ width: '50%', height: '50%' }} />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Thumbnail Image</Text>
          <TouchableOpacity onPress={() => openPicker('image')}>
            {form.thumbnail ? (
              <Image source={{ uri: form.thumbnail.uri }} resizeMode='cover' className='w-full h-64 rounded-2xl'
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                <Image source={icons.upload} resizeMode='contain'
                  style={{ width: '1.25rem', height: '1.25rem' }} />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField title="AI prompt"
          value={form.prompt}
          placeholder="The prompt you used to create this video"
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles={'mt-7'}
        />

        <CustomButton title="Submit & Publish" handlePress={submitVideo} containerStyles={"mt-7"} isLoading={uploading} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create
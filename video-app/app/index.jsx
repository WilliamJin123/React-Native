import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../constants/images'
import CustomButton from '../components/CustomButton'
export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full"> 
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className="w-full items-center h-full px-4">
          <Image source={images.logo} resizeMode="contain" style={{width:130, height:84}}/>
          <Image source={images.cards} resizeMode="contain" className="max-w--[380px]" style={{height:'40%'}}/>

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities with{' '}<Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image source={images.path} resizeMode="contain" className="absolute -bottom-2 -right-8" style={{width:136, height:15}}/>
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">Where creativity meets innovation: embark on a journey of limitless exploration with Aora</Text>

          <CustomButton />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}



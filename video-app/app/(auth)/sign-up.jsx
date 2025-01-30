import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../constants/images'
import FormField from '../../components/formField'
import CustomButton from '../../components/customButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/globalProvider'

const SignUp = () => {
  const {setUser, setIsLoggedIn} = useGlobalContext()
  const [form, setForm] = useState({
    username:'',
    email:'',
    password:''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)


  const submit = async () => {
    if(form.username==="" || form.email==="" || form.password===""){
      Alert.alert('Error', 'Please fill in all fields')
    }
    setIsSubmitting(true)

    try{
      const result = await createUser(form.email, form.password, form.username)
      setUser(result)
      setIsLoggedIn(true)
      router.replace('/home')
    }catch(err){
      Alert.alert('Error', err.message)
    }finally{
      setIsSubmitting(false)
    }
    
  }
   
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[35%] px-4 mt-3">
          <Image source={images.logo} resizeMode='contain' style={{width: 115, height: 35}}/>
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Sign up to Aora</Text>
        </View>
        <FormField title="Username" value={form.username} handleChangeText={(e) => setForm({...form, username:e})} otherStyles="mt-10"/>
        <FormField title="Email" value={form.email} handleChangeText={(e) => setForm({...form, email:e})} otherStyles="mt-7" keyboardType="email-address"/>
        <FormField title="Password" value={form.password} handleChangeText={(p) => setForm({...form, password:p})} otherStyles="mt-7" keyboardType="email-address"/>

        <CustomButton 
          title="Sign up"
          handlePress={submit}
          containerStyles={'mt-7'}
          isLoading={isSubmitting}
        />  
        <View className="justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-gray-100 font-pregular">
            Have an account already?
          </Text>
          <Link href="/sign-in" className='text-lg font-psemibold text-secondary'>Sign In</Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
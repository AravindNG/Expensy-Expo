import { StatusBar } from 'expo-status-bar';
import { Image, Text, View, ScrollView } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { useEffect } from 'react';
import {SecureStore} from 'expo';

export default function App() {
  async function getToken(){
    if(!SecureStore)return null;
    const token = await SecureStore.getItemAsync('secure_token');
    return token;
  }
  useEffect(()=>{
    const token = getToken();
    // console.log("token"+JSON.stringify(token));
    if(token){
      setTimeout(()=>{
        router.push('/(tabs)/home');
      },200);
    }
  },[SecureStore]);
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height : '100%'}}>
        <View className=" w-full justify-center items-center px-4 ">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          
          <View className="relative mt-5">
            <Text className="text-2xl text-white font-bold font text-center">
              Discover Expense Expenditure{"\n"}
              with{"\n"}{" "}
              <Text className="text-secondary-200 text-3xl">Expensy</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[138px] h-[16px] absolute-bottom -right-24"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">Where we can save something precious, somehow</Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}

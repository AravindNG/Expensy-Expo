import React, { useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { signIn } from '../../services/auth';
import {SecureStore} from 'expo';

const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const submit = async () => {
    setIsSubmitting(true);
    setError(null); // Reset error before new request

    try {
      const data = await signIn(form);
      if(!data.token)return;
      console.log('Login successful:', data);
      await SecureStore.setItemAsync('secure_token',data.token);
      // const token = await SecureStore.getItemAsync('secure_token');
      router.push('/(tabs)/home');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed: ' + (error.response?.data?.msg || 'Network Error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View>
          <Text className="text-2xl"></Text>
        </View>
        <View className="w-full flex justify-center min-h-[85] px-4 my-6">
          <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[34px]" />
          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to Expensy
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          {error && <Text style={{ color: 'red' }}>{error}</Text>}
          <CustomButton title="Sign In" handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting} />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Don't have an account?</Text>
            <Link href="/(auth)/sign-up" className="text-lg font-psemibold text-secondary">
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

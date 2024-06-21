import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { signUp } from '../../services/auth';

const SignUp = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const submit = async () => {
    try {
      setIsSubmitting(true);
      setError(null); // Reset error before new request
      const data = await signUp(form);
      // if(!data.token)return;
      console.log('Login successful:', data);
      await SecureStore.setItemAsync('secure_token',data.token);
      router.push('/(auth)/sign-in');
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Registration failed: ' + (error.response?.data?.msg || 'Network Error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full flex justify-center min-h-[85] px-4 my-6">
          <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[34px]" />
          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Sign Up to Expensy
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />
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
          <CustomButton title="Sign Up" handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting} />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Have an Account already?</Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/sign-in')} style={{ marginLeft: 5 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFA001' }}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

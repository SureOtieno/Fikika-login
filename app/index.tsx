import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useRouter} from "expo-router";

const Home = () => {
    const router = useRouter();
  return (
      <View className="flex-1 justify-center items-center">
          <Text className="text-5xl font-bold text-dark-200">Welcome!</Text>
          <View>
              <TouchableOpacity onPress={() => router.push('Login')}>
                  <Text className="text-xl font-bold text-dark-200">Login</Text>
              </TouchableOpacity>
              <Text> / </Text>
              <TouchableOpacity onPress={() => router.push('Signup')}>
                  <Text className="text-xl font-bold text-dark-200">Signup</Text>
              </TouchableOpacity>
          </View>
      </View>

  );
};

export default Home;

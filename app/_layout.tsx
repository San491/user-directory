import React from 'react';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native-reanimated/lib/typescript/Animated';



export default function RootLayout() {
  return (
    <PaperProvider>
      <StatusBar backgroundColor='' />
      <Stack screenOptions={{ headerShown: false }} />
    </PaperProvider>
  );
}

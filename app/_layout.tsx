import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <PaperProvider>
      <StatusBar backgroundColor=''/>
      <Stack screenOptions={{ headerShown: false }} />
    </PaperProvider>
  );
}

import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost';

import { UserContextProvider } from './src/context/UserContext';

import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  if(!fontsLoaded) return <AppLoading />

  return (
    <>
      <UserContextProvider>
        <StatusBar />
        <Routes />
      </UserContextProvider>
    </>
  );
}

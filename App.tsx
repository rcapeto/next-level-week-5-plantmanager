import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost';
import * as Notifications from 'expo-notifications';

import { UserContextProvider } from './src/context/UserContext';

import Routes from './src/routes';
import { Plants } from './src/interface';

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data.plant as Plants; //detalhes da planta
        console.log(data);
      }
    );

    return () => subscription.remove();

    // CONSEGUIR TODAS AS NOTIFICAÇÕES
    // async function notifications() {
    //   const data = await Notifications.getAllScheduledNotificationsAsync();
    //   console.log(data);
    // }
    // notifications();
    
    //Cancelar todas as notificações
    // await Notifications.cancelAllScheduledNotificationsAsync();
  }, []);

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

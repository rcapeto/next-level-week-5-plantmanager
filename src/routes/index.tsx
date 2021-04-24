import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';

import { StackRoutes } from './stack.routes';
import { useUser } from '../context/UserContext';

export default function Routes() {
   const { loading } = useUser();

   if(loading) return <AppLoading />

   return(
      <NavigationContainer>
         <StackRoutes />
      </NavigationContainer>
   );
}
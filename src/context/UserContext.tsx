import React, { useContext, createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import * as Notifications from 'expo-notifications';

import { UserContextProps, UserContextData, Plants, StoragePlantProps } from '../interface';

const UserContext = createContext({} as UserContextData);

export function UserContextProvider({ children }: UserContextProps) {
   const [user_name, setUserName] = useState<string>('');
   const [loading, setLoading] = useState<boolean>(false);
   const [notificationPermission, setNotificationPermission] = useState<boolean>(false);

   async function hasUser() {
      setLoading(true);
      
      try {
         const user = await AsyncStorage.getItem('@plantManager:_name_');

         if(user) {
            setUserName(user); 
         }
      } catch(err) {
        throw new Error(err);

      } finally {
         setLoading(false);
      }
   }

   async function changeUserName(value: string) {
      setUserName(value);

      try {
         await AsyncStorage.setItem('@plantManager:_name_', value);
      } catch(err) {
         throw new Error(err);
      }
   }

   async function savePlant(plant: Plants) {
      try {
         const nextTime = new Date(plant.dateTimeNotification);
         const now = new Date();

         const { times, repeat_every } = plant.frequency;

         if(repeat_every === 'week') {
            const interval = Math.trunc(7 / times);
            nextTime.setDate(now.getDate() + interval);
         } else {
            nextTime.setDate(nextTime.getDate() + 1);
         }

         const seconds = Math.abs(
            Math.ceil((now.getTime() - nextTime.getTime()) / 1000)
         );

         const newPlant: StoragePlantProps = {
            [plant.id] : { 
               data: plant,
               notificationId: ''
            }
         };
         
         if(notificationPermission) {
            const notificationId = await Notifications.scheduleNotificationAsync({
               content: {
                  title: 'Heey 🌱',
                  body: `Está na hora de cuidar da sua ${plant.name}`,
                  sound: true,
                  priority: Notifications.AndroidNotificationPriority.HIGH,
                  data: {
                     plant
                  },
               },
               trigger: {
                  seconds: seconds < 60 ? 60 : seconds,
                  repeats: true
               }
            });
            newPlant[plant.id]['notificationId'] = notificationId;
         }

         const data = await AsyncStorage.getItem('@plantManager:_plants_');
         const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

         await AsyncStorage.setItem(
            '@plantManager:_plants_',
            JSON.stringify({...newPlant, ...oldPlants})
         );
      } catch(err) {
         throw new Error(err);
      }
   }

   async function removePlant(id: number) {
      const data = await AsyncStorage.getItem('@plantManager:_plants_');
      const plantsStorage = data ? (JSON.parse(data) as StoragePlantProps) : {};

      await Notifications.cancelScheduledNotificationAsync(plantsStorage[id].notificationId);

      delete plantsStorage[id];
      await AsyncStorage.setItem('@plantManager:_plants_', JSON.stringify(plantsStorage));
   }

   async function getPlants() {
      try {
         const data = await AsyncStorage.getItem('@plantManager:_plants_');
         const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

         const plantsSorted = Object.keys(plants).map(plantId => {
            return {
               ...plants[plantId].data,
               hour: format(new Date(plants[plantId].data.dateTimeNotification), 'HH:mm'),
            }
         })
         .sort((a, b) => 
            Math.floor(
               new Date(a.dateTimeNotification).getTime() / 1000 -
               Math.floor(new Date(b.dateTimeNotification).getTime() / 100)
            )
         );

         return plantsSorted;

      } catch(err) {
         throw new Error(err);
      }
   }

   async function requestNotification() {
      const { status } = await Notifications.requestPermissionsAsync();
      
      if(status === 'granted') {
         setNotificationPermission(true);
      }
   }

   async function logOut() {
      await AsyncStorage.clear();
      setUserName('');
   }

   useEffect(() => {
      hasUser();
      requestNotification();
   }, []);

   return(
      <UserContext.Provider value={{ 
         userName: user_name, 
         loading,
         changeUserName,
         savePlant,
         getPlants,
         removePlant,
         logOut
      }}>
         { children }
      </UserContext.Provider>
   );
}

export function useUser() {
   return useContext(UserContext);
}
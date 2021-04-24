import React, { useContext, createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

import { UserContextProps, UserContextData, Plants, StoragePlantProps } from '../interface';

const UserContext = createContext({} as UserContextData);

export function UserContextProvider({ children }: UserContextProps) {
   const [user_name, setUserName] = useState<string>('');
   const [loading, setLoading] = useState<boolean>(false);

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
         const data = await AsyncStorage.getItem('@plantManager:_plants_');
         const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

         const newPlant = {
            [plant.id] : { data: plant }
         };

         await AsyncStorage.setItem(
            '@plantManager:_plants_',
            JSON.stringify({...newPlant, ...oldPlants})
         );
      } catch(err) {
         throw new Error(err);
      }
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

   useEffect(() => {
      hasUser();
   }, []);

   return(
      <UserContext.Provider value={{ 
         userName: user_name, 
         loading,
         changeUserName,
         savePlant,
         getPlants
      }}>
         { children }
      </UserContext.Provider>
   );
}

export function useUser() {
   return useContext(UserContext);
}
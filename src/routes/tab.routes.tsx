import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import colors from '../styles/colors'
import SelectPlant from '../pages/PlantSelect';
import MyPlants from '../pages/MyPlants';

const { Navigator, Screen } = createBottomTabNavigator();

export default function TabRoutes() {
   return(
      <Navigator 
         tabBarOptions={{
            activeTintColor: colors.green,
            inactiveTintColor: colors.heading,
            labelPosition: 'beside-icon',
            style: {
               paddingVertical: 20,
               height: 80
            }
         }}
      >
         <Screen 
            name="NewPlant"
            component={SelectPlant}
            options={{
               title: 'Nova Planta',
               tabBarIcon: ({ color, size }) => (
                  <MaterialIcons 
                     name="add-circle-outline" 
                     size={size}
                     color={color}
                  />
               )
            }}
         />
         <Screen 
            name="MyPlants"
            component={MyPlants}
            options={{
               title: 'Minhas Plantas',
               tabBarIcon: ({ color, size }) => (
                  <MaterialIcons 
                     name="format-list-bulleted" 
                     size={size}
                     color={color}
                  />
               )
            }}
         />
      </Navigator>
   );
}
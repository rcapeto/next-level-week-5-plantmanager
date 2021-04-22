import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../styles/colors';

import Welcome from '../pages/Welcome';
import UserIdentification from '../pages/UserIdentification';
import Confirmation from '../pages/Confirmation';
import SelectPlant from '../pages/PlantSelect';

const { Navigator, Screen } = createStackNavigator();
 
export function StackRoutes() {
   return(
      <Navigator screenOptions={{
         headerShown: false,
         cardStyle: {
            backgroundColor: colors.white,
         }
      }}>
         <Screen 
            name="Welcome"
            component={Welcome}
         />
         <Screen 
            name="UserIdentification"
            component={UserIdentification}
         />
         <Screen 
            name="Confirmation"
            component={Confirmation}
         />
         <Screen 
            name="SelectPlant"
            component={SelectPlant}
         />
      </Navigator>
   );
}
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { useUser } from '../../context/UserContext';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export default function Header() {
   const { userName } = useUser();

   return(
      <View style={styles.container}>
         <View>
            <Text style={styles.greeting}>Olá,</Text>
            <Text style={styles.userName}>{userName}</Text>
         </View>

         <Image 
            source={{ uri: 'https://github.com/rcapeto.png' }} 
            style={styles.userImage} 
            resizeMode="cover"
         />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: getStatusBarHeight(),
      paddingVertical: 20,
   },
   greeting: {
      fontSize: 24,
      color: colors.heading,
      fontFamily: fonts.text
   },
   userName: {
      fontSize: 34,
      fontFamily: fonts.heading,
      color: colors.heading,
      lineHeight: 40
   },
   userImage: {
      width: 70,
      height: 70,
      borderRadius: 40,
   },
});
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

import { ConfirmationProps } from '../../interface';

import Button from '../../components/Button';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const emojis = {
   hug: '😜',
   smile: '😀'
}

export default function Confirmation() {
   const navigation = useNavigation();
   const route = useRoute();

   const { 
      buttonTitle,
      icon,
      nextScreen,
      subtitle,
      title
   } = route.params as ConfirmationProps;

   function handleMoveOn(nextScreen: string) {
      navigation.reset({
         routes: [{ name: nextScreen }]
      });
   }

   return(
      <SafeAreaView style={styles.container}>
         <View style={styles.content}>

            <Text style={styles.emoji}>{emojis[icon]}</Text>

            <Text style={styles.title}>{title}</Text>

            <Text style={styles.subtitle}>
               {subtitle}
            </Text>

            <View style={styles.footer}>
               <Button 
                  title={`${buttonTitle}`}
                  onPress={() => handleMoveOn(nextScreen)}
               />
            </View>
         </View>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
   },
   content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
   },
   emoji: {
      fontSize: 78,
   },
   title: {
      fontSize: 22,
      fontFamily: fonts.heading,
      color: colors.heading,
      textAlign: 'center',
      lineHeight: 38,
      marginTop: 15
   },
   subtitle: {
      fontFamily: fonts.text,
      paddingHorizontal: 20,
      color: colors.heading,
      textAlign: 'center',
      fontSize: 17,
      marginTop: 24
   },
   footer: {
      width: '100%',
      paddingHorizontal: 50,
      marginTop: 20,
   }
});
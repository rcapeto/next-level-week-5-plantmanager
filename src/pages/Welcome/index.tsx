import React, { useEffect } from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useUser } from '../../context/UserContext';

import colors from '../../styles/colors';
import wateringImg from '../../assets/welcome.png';
import fonts from '../../styles/fonts';

export default function Welcome() {
   const { userName } = useUser();

   const navigation = useNavigation();

   function handleStart() {
      navigation.navigate('UserIdentification');
   }

   useEffect(() => {
      if(userName) {
         navigation.reset({
            routes: [{ name: 'TabRoutes' }]
         });
      }
   }, []);

   return(
      <SafeAreaView style={styles.container}>
         <View style={styles.wrapper}>
            <Text style={styles.title}>
               Gerencie{'\n'} suas plantas de {'\n'} forma fácil
               </Text>

            <Image source={wateringImg} style={styles.image} />

            <Text style={styles.description}>
               Não esqueça mais de regar suas plantas. Nõs cuidamos de lembrar você
               sempre que precisar.
            </Text>

            <TouchableOpacity 
               style={styles.button}
               activeOpacity={0.6}
               onPress={handleStart}
            >
               <Feather name="chevron-right" size={22} color="#fff"/>
            </TouchableOpacity>
         </View>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   wrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingHorizontal: 20
   },
   title: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.heading,
      marginTop: 48,
      fontFamily: fonts.heading,
      lineHeight: 34
   },
   image: {},
   description: {
      fontSize: 18,
      paddingHorizontal: 20,
      color: colors.heading,
      textAlign: 'center',
      fontFamily: fonts.text
   },
   button: {
      backgroundColor: colors.green,
      borderRadius: 16,
      marginBottom: 30,
      alignItems: 'center',
      justifyContent: 'center',
      height: 56,
      width: 56,
   },
   buttonText: {
      color: colors.white,
      fontSize: 24,
   },
});
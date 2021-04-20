import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import colors from '../../styles/colors';
import wateringImg from '../../assets/welcome.png';

export default function Welcome() {
   return(
      <SafeAreaView style={styles.container}>
         <Text style={styles.title}>
            Gerencie{'\n'} suas plantas{'\n'} de forma fácil
            </Text>

         <Image source={wateringImg} style={styles.image}/>

         <Text style={styles.description}>
            Não esqueça mais de regar suas plantas. Nõs cuidamos de lembrar você
            sempre que precisar.
         </Text>

         <TouchableOpacity 
            style={styles.button}
            activeOpacity={0.6}
            onPress={() => {}}
         >
            <Text style={styles.buttonText}>
               {'>'}
            </Text>
         </TouchableOpacity>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between'
   },
   title: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.heading,
      marginTop: 48,
   },
   image: {

   },
   description: {
      fontSize: 18,
      paddingHorizontal: 20,
      color: colors.heading,
      textAlign: 'center'
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
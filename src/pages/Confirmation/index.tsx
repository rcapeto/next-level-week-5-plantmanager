import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

import Button from '../../components/Button';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export default function Confirmation() {
   return(
      <SafeAreaView style={styles.container}>
         <View style={styles.content}>

            <Text style={styles.emoji}>😀</Text>

            <Text style={styles.title}>Prontinho</Text>

            <Text style={styles.subtitle}>
               Agora vamos começar a cuidar das suas plantinhas com muito cuidado.
            </Text>

            <View style={styles.footer}>
               <Button 
                  title="Confirmar"
                  onPress={() => {}}
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
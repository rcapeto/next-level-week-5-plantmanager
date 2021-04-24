import React, { useState, useEffect } from 'react';
import { 
   View, 
   Text, 
   StyleSheet, 
   SafeAreaView, 
   TextInput, 
   KeyboardAvoidingView, 
   Platform, 
   Alert, 
   Keyboard,
   TouchableWithoutFeedback 
} from "react-native";
import { useNavigation } from '@react-navigation/native';

import { useUser } from '../../context/UserContext';
import { ConfirmationProps } from '../../interface';
import Button from '../../components/Button';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export default function UserIdentification() {
   const [isFocused, setIsFocused] = useState<boolean>(false);
   const [name, setName] = useState<string>('');
   const navigation = useNavigation();
   const { changeUserName } = useUser();

   async function handleConfirmation() {
      Keyboard.dismiss();

      if(!name) return Alert.alert('PlantManager', 'Poxa... me diz como se chama 😢');

      try {
         await changeUserName(name);
         
         const params = {
            title: 'Prontinho',
            subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
            buttonTitle: 'Começar',
            icon: 'smile',
            nextScreen: 'TabRoutes'
         } as ConfirmationProps;

         navigation.navigate('Confirmation', params);

      } catch(err) {
         console.error(err);
         Alert.alert('PlantManager', 'Não foi possível acessar seu nome...😕');
      }
   }

   function handleInputBlur() {
      setIsFocused(false);
   }

   function handleInputFocus() {
      setIsFocused(true);
   }

   return(
      <SafeAreaView style={styles.container}>
         <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         >
            <TouchableWithoutFeedback style={styles.content} onPress={Keyboard.dismiss}>
               <View style={styles.form}>
                  <View style={styles.header}>
                     <Text style={styles.emoji}>
                        {
                           (isFocused || name.length) ? '😀' : '😆'
                        }
                     </Text>
                     <Text style={styles.title}>Como podemos {'\n'} chamar você?</Text>
                  </View>
                  <TextInput 
                     style={[
                        styles.input,
                        (isFocused || name.length) ? styles.notEmpty : {}
                     ]}
                     placeholder="Digite seu nome"
                     onBlur={handleInputBlur}
                     onFocus={handleInputFocus}
                     value={name}
                     onChangeText={setName}
                  />
                  <View style={styles.footer}>
                     <Button 
                        onPress={handleConfirmation}
                        title="Confirmar"
                     />
                  </View>
               </View>
            </TouchableWithoutFeedback>
         </KeyboardAvoidingView>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   content: {
      flex: 1,
   },
   form: {
      flex: 1,
      paddingHorizontal: 54,
      alignItems: 'center',
      justifyContent: 'center',
   },
   header: {
      alignItems: 'center'
   },
   title: {
      fontSize: 24,
      lineHeight: 32,
      textAlign: 'center',
      color: colors.heading,
      fontFamily: fonts.heading
   },
   emoji: {
      fontSize: 44
   },
   input: {
      borderBottomWidth: 1,
      borderColor: colors.heading,
      marginTop: 50,
      padding: 10,
      textAlign: 'center',
      width: '100%',
      fontSize: 18,
   },
   notEmpty: {
      borderColor: colors.green
   },
   footer: {
      marginTop: 50,
      width: '100%',
      paddingHorizontal: 20
   }
});
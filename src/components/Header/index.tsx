import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

import { useUser } from '../../context/UserContext';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export default function Header() {
   const [showModal, setShowModal] = useState<boolean>(false);
   const { userName, logOut } = useUser();
   const navigation = useNavigation();

   const handleLogout = useCallback(async () => {
      setShowModal(false);
      
      await logOut();

      navigation.reset({
         routes: [{ name: 'Welcome' }],
      });
   }, []);

   return(
      <View style={styles.container}>
         <View>
            <Text style={styles.greeting}>Olá,</Text>
            <Text style={styles.userName}>{userName}</Text>
         </View>

         <TouchableOpacity onPress={() => setShowModal(true)}>
            <Image 
               source={{ uri: 'https://github.com/rcapeto.png' }} 
               style={styles.userImage} 
               resizeMode="cover"
            />
         </TouchableOpacity>

         {
            showModal &&(
               <Modal 
                  statusBarTranslucent={false}
                  animationType="slide" 
                  visible={showModal} 
               >
                  <View style={styles.modal}>
                     <TouchableOpacity onPress={handleLogout} style={styles.buttonLogOut}>
                        <Text style={styles.buttonLogOutText}>Deslogar</Text>
                     </TouchableOpacity>

                     <TouchableOpacity style={styles.buttonCancel}
                        onPress={() => setShowModal(false)}
                     >
                        <Feather name="x" color={colors.red} size={32}/>
                     </TouchableOpacity>
                  </View>
               </Modal>
            ) 
         }
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
   modal: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: '90%',
      padding: 100,
      position: 'relative'
   },
   buttonLogOut: {
      backgroundColor: colors.red,
      height: 40,
      width: 170,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
   },
   buttonLogOutText: {
      fontFamily: fonts.heading,
      color: colors.white,
      fontSize: 20
   },
   buttonCancel: {
      position: 'absolute',
      top: Platform.OS === 'android' ? 20 : 40,
      right: 20
   }
});
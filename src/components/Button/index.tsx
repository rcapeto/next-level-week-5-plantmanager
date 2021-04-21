import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface ButtonProps {
   title: string;
   onPress: () => void;
}

export default function Button({ onPress, title }: ButtonProps) {
   return(
     <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
     </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
   button: {
      backgroundColor: colors.green,
      height: 56,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center'
   },
   text: {
      fontSize: 16,
      color: colors.white,
      fontFamily: fonts.heading
   },
});

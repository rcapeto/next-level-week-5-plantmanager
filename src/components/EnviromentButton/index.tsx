import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface EnviromentButtonProps extends RectButtonProps {
   title: string;
   active?: boolean;
}

export default function EnviromentButton({ 
   title, active = false, ...rest 
}: EnviromentButtonProps
) {
   return(
      <RectButton 
         style={[styles.button, active ? styles.buttonActive : {}]} 
         {...rest} 
      >
         <Text style={[styles.text, active ? styles.textActive : {}]}>{title}</Text>
      </RectButton>
   );
}

const styles = StyleSheet.create({
   button: {
      backgroundColor: colors.shape,
      width: 76,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      marginHorizontal: 5,
   },
   buttonActive: {
      backgroundColor: colors.green_light
   },
   text: {
      color: colors.heading,
      fontFamily: fonts.text
   },
   textActive: {
      fontFamily: fonts.heading,
      color: colors.green_dark,
   }
});
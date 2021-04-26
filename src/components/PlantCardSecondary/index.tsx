import React from 'react';
import { Text, StyleSheet, View, Animated } from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Feather } from '@expo/vector-icons';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface PlantProps extends RectButtonProps {
   data: {
      name: string;
      photo: string;
      hour: string;
   }
   handleRemove: () => void;
}

export default function PlantCardSecondary({ handleRemove,data , ...rest }: PlantProps) {
   return(
      <Swipeable
         overshootRight={false}
         renderRightActions={() => (
            <Animated.View>
               <View>
                  <RectButton style={styles.buttonRemove} onPress={handleRemove}>
                     <Feather color={colors.white} size={32} name="trash"/>
                  </RectButton>
               </View>
            </Animated.View>
         )}
      >
         <RectButton
            style={styles.container}
            {...rest}
         >
            <SvgFromUri uri={data.photo} width={50} height={50}/>
            <Text style={styles.title}>{data.name}</Text>

            <View style={styles.details}>
               <Text style={styles.label}>
                  Regar às
               </Text>
               <Text style={styles.hour}>
                  {data.hour}
               </Text>
            </View>
         </RectButton>
      </Swipeable>
   );
}

const styles = StyleSheet.create({
   container: {
      width: '100%',
      paddingHorizontal: 10,
      paddingVertical: 25,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.shape,
      marginVertical: 5
   },
   title: {
      flex: 1,
      marginLeft: 10,
      fontFamily: fonts.heading,
      fontSize: 17,
   },
   details: {
      alignItems: 'flex-end'
   },
   label: {
      fontSize: 16,
      fontFamily: fonts.text,
      color: colors.body_light
   },
   hour: {
      marginTop: 5,
      fontSize: 16,
      fontFamily: fonts.heading,
      color: colors.body_dark
   },
   buttonRemove: {
      width: 90,
      height: '90%',
      backgroundColor: colors.red,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 8,
      borderRadius: 20,
      marginLeft: -25,
      paddingLeft: 10,
   }
});
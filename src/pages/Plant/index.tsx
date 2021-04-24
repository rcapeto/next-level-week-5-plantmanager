import React, { useState } from 'react';
import { 
   Alert, 
   View, 
   StyleSheet, 
   Text,
   Image, 
   ScrollView, 
   Platform, 
   TouchableOpacity,
   Modal
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SvgFromUri } from 'react-native-svg';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { isBefore, format } from 'date-fns';

import { Plants, ConfirmationProps } from '../../interface';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import { useUser } from '../../context/UserContext';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import tipImage from '../../assets/waterdrop.png';

interface RouteParams {
   plant: Plants
}

export default function Plant() {
   const [datePicker, setDatePicker] = useState(new Date());
   const [showPicker, setShowPicker] = useState<boolean>(Platform.OS === 'ios');

   const { savePlant } = useUser();
   const navigation = useNavigation();
   const route = useRoute();
   const { plant } = route.params as RouteParams;

   if(!plant) return <Loading />

   function handleChangeTime(event: Event, dateTime: Date | undefined) {
      if(Platform.OS === 'android') {
         setShowPicker(!showPicker);
      }

      if(dateTime && isBefore(dateTime, new Date())) {
         setDatePicker(new Date());
         return Alert.alert('PlantManager', 'Escolha uma data do futuro 😁');
      }

      if(dateTime) {
         setDatePicker(dateTime);
      }
   }

   function handleShowPicker() {
      setShowPicker(!showPicker);
   }

   async function handleSave() {
      try {
         await savePlant({...plant, dateTimeNotification: datePicker });

         const params = {
            title: 'Tudo certo',
            subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.',
            buttonTitle: 'Muito Obrigado :D',
            icon: 'hug',
            nextScreen: 'TabRoutes'
         } as ConfirmationProps;

         navigation.navigate('Confirmation', params);

      } catch(err) {
         Alert.alert('PlantManager', 'Não foi possível salvar a planta...😕');
      }
   }

   return(
      <ScrollView 
         contentContainerStyle={styles.container}
      >
         <View style={styles.plantInfo}>
            <SvgFromUri 
               uri={plant.photo}
               height={150}
               width={150}
            />
            <Text style={styles.name}>
               {plant.name}
            </Text>

            <Text style={styles.description}>
               {plant.about}
            </Text>
         </View>
         <View style={styles.controllers}>
            <View style={styles.tipContainer}>
               <Image source={tipImage} style={styles.tipImage}/>
               <Text style={styles.tipText}>{plant.water_tips}</Text>
            </View>

            <Text style={styles.alertText}>
               Escolha o melhor horário para ser lembrado.
            </Text>

            {
            showPicker && (
               <DateTimePicker 
                  value={datePicker}
                  mode="time"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleChangeTime}
               />) 
            }

            {
               Platform.OS === 'android' && (
                  <TouchableOpacity onPress={handleShowPicker} style={styles.timeButton}>
                     <Text style={styles.timeButtonText}>
                        {`Mudar horário: ${format(datePicker, 'HH:mm')}`}
                     </Text>
                  </TouchableOpacity>
               )
            }

            <Button title="Cadastrar Planta" onPress={handleSave}/>
         </View>
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.shape,
      justifyContent: 'space-between'
   },
   plantInfo: {
      flex: 1,
      paddingHorizontal: 30,
      paddingVertical: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.shape

   },
   name: {
      fontFamily: fonts.heading,
      fontSize: 24,
      color: colors.heading,
      marginTop: 15
   },
   description: {
      textAlign: 'center',
      fontFamily: fonts.text,
      color: colors.heading,
      fontSize: 17,
      marginTop: 10
   },
   controllers: {
      backgroundColor: colors.white,
      paddingTop: 10,
      paddingHorizontal: 20,
      paddingBottom: getBottomSpace() || 20
   },
   tipContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.blue_light,
      padding: 20,
      borderRadius: 20,
      position: 'relative',
      bottom: 60
   },
   tipImage: {
      width: 56,
      height: 56
   },
   tipText: {
      flex: 1,
      marginLeft: 20,
      fontFamily: fonts.text,
      color: colors.blue,
      textAlign: 'justify',
      fontSize:17,
   },
   alertText: {
      textAlign: 'center',
      fontFamily: fonts.complement,
      color: colors.heading,
      fontSize: 12,
      marginBottom: 5
   },
   timeButton: {
      padding: 10,
      marginBottom: 20,
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.1)'
   },
   timeButtonText: {
      fontFamily: fonts.text,
      fontSize: 18
   },
});
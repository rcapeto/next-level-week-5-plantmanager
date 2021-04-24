import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';

import Header from '../../components/Header';
import { MyPlant } from '../../interface';
import { useUser } from '../../context/UserContext';
import PlantCardSecondary from '../../components/PlantCardSecondary';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import waterDropImage from '../../assets/waterdrop.png';

export default function MyPlants() {
   const { getPlants } = useUser();
   const [loading, setLoading] = useState<boolean>(true);
   const [nextWated, setNextWatered] = useState<string>('');
   const [plants, setPlants] = useState<MyPlant[]>([]);

   useEffect(() => {
      async function loadStorageData() {
         const plantsStoraged = await getPlants();

         const nextTime = formatDistance(
            new Date(plantsStoraged[0].dateTimeNotification).getTime(),
            new Date().getTime(),
            { locale: pt }
         );
         setNextWatered(
            `Não se esqueça de regar a ${plantsStoraged[0].name} à ${nextTime}`
         );   
         setPlants(plantsStoraged);
      }

      loadStorageData();
   }, []);

   return(
      <View style={styles.container}>
         <Header />

         <View style={styles.spotlight}>
            <Image 
               source={waterDropImage}
               style={styles.image}
            />
            <Text style={styles.spotText}>{nextWated}</Text>
         </View>

         <View style={styles.myPlants}>
            <Text style={styles.plantsTitle}>
               Próximas Regadas
            </Text>

            <FlatList 
               data={plants}
               keyExtractor={item => String(item.id)}
               renderItem={({ item }) => <PlantCardSecondary data={item}/>}
               showsVerticalScrollIndicator={false}
               contentContainerStyle={{ flex: 1 }}
            />
         </View>

      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 30,
      paddingTop: 50,
      backgroundColor: colors.background
   },
   spotlight: {
      backgroundColor: colors.blue_light,
      paddingHorizontal: 20,
      borderRadius: 20,
      height: 110,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
   },
   image: {
      width: 60,
      height: 60,
   },
   spotText: {
      flex: 1,
      color: colors.blue,
      paddingHorizontal: 20,
      textAlign: 'justify'
   },
   myPlants: {
      flex: 1,
      width: '100%'
   },
   plantsTitle: {
      fontSize: 24,
      fontFamily: fonts.heading,
      color: colors.heading,
      marginVertical: 20,
   },
});
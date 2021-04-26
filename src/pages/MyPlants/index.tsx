import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Alert, RefreshControl } from 'react-native';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';

import Header from '../../components/Header';
import { MyPlant } from '../../interface';
import { useUser } from '../../context/UserContext';
import PlantCardSecondary from '../../components/PlantCardSecondary';

import Loading from '../../components/Loading';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import waterDropImage from '../../assets/waterdrop.png';

export default function MyPlants() {
   const { getPlants, removePlant } = useUser();
   const [loading, setLoading] = useState<boolean>(true);
   const [nextWated, setNextWatered] = useState<string>('');
   const [plants, setPlants] = useState<MyPlant[]>([]);
   const [refreshing, setRefresing] = useState<boolean>(false);

   const handleRemove = useCallback((plant: MyPlant) => {
      Alert.alert('PlantManager', `Deseja remover a ${plant.name}?`, [
         {
            text: 'Não 😊',
            style: 'cancel'
         },
         {
            text: 'Sim 😢',
            onPress: async () => {
               try {
                  await removePlant(plant.id);
                  setPlants(oldPlants => oldPlants.filter(item => item.id !== plant.id));
               } catch(err) {
                  Alert.alert('PlantManager', `Não foi possível remover 😢`);
               }
            }
         }
      ]);
   }, []);

   async function loadStorageData() {
      const plantsStoraged = await getPlants();

      if(!plantsStoraged.length) {
         setPlants([]);
         setLoading(false);
         Alert.alert('PlantManager', 'Você não possui plantas... 😕');
         setRefresing(false);
         return;
      }

      const nextTime = formatDistance(
         new Date(plantsStoraged[0].dateTimeNotification).getTime(),
         new Date().getTime(),
         { locale: pt }
      );
      setNextWatered(
         `Não se esqueça de regar a ${plantsStoraged[0].name} à ${nextTime}`
      );   
      setPlants(plantsStoraged);
      setLoading(false);
   }

   async function onRefresh() {
      setRefresing(true);
      await loadStorageData();
      setRefresing(false);
   }

   useEffect(() => {
      loadStorageData();
   }, []);

   if(loading) return <Loading />

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
               renderItem={({ item }) => (
                  <PlantCardSecondary 
                     data={item}
                     handleRemove={() => handleRemove(item)}
                  />
               )}
               showsVerticalScrollIndicator={false}
               refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
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
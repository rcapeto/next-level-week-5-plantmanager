import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import api from '../../services/api';
import { Enviroment, Plants } from '../../interface';

import Header from '../../components/Header';
import EnviromentButton from '../../components/EnviromentButton';
import PlantCardPrimary from '../../components/PlantCardPrimary';
import Loading from '../../components/Loading';


export default function SelectPlant() {
   const navigation = useNavigation();

   const [enviroments, setEnviroments] = useState<Enviroment[]>([]);
   const [plants, setPlants] = useState<Plants[]>([]);
   const [filteredPlants, setFilteredPlants] = useState<Plants[]>([]);
   const [enviromentSelected, setEnviromentSelected] = useState('all');
   const [loading, setLoading] = useState(true);

   const [currentPage, setCurrentPage] = useState(1);
   const [refreshing, setRefreshing] = useState(false);
   const [total, setTotal] = useState(0);
   const [apiLoading, setApiLoading] = useState(false);

   async function getEnviroments() {
      const { data } = await api.get('plants_environments', {
         params: {
            _sort: 'title',
            _order: 'asc'
         }
      });
      setEnviroments([{ key: 'all', title: 'Todos'}, ...data]);
   }

   async function getPlants(page = currentPage, shouldRefresh = false){
      if(total && page > total) return;

      if(!shouldRefresh) setApiLoading(true);

      const { data, headers } = await api.get('plants', { 
         params: {
            _sort: 'name',
            _order: 'asc',
            _page: page,
            _limit: 8,
         }
      });   
      const totalPages = Math.ceil(headers['x-total-count'] / 8);

      setTotal(totalPages);
      setPlants(shouldRefresh ? data : [...plants, ...data]);
      setFilteredPlants(shouldRefresh ? data : [...plants, ...data]);
      setCurrentPage(page + 1);
      setLoading(false);

      setApiLoading(false);
   }

   function handleEnviromentSelected(key: string) {
      setEnviromentSelected(key);

      if(key === 'all') 
         return setFilteredPlants(plants);
      
      const filtered = plants.filter(plant => plant.environments.includes(key));
      setFilteredPlants(filtered);
   }

   async function onRefresh() {
      setRefreshing(true);
      setPlants([]);
      setFilteredPlants([]);
      await getPlants(1, true);
      setRefreshing(false);
   }

   function navigateToDetail(plant: Plants) {
      navigation.navigate('Plant', { plant });
   }

   useEffect(() => {
      getEnviroments();
   }, []);

   useEffect(() => {
      getPlants();
   }, []);

   if(loading) return <Loading />

   return(
      <SafeAreaView style={styles.container}>
         <View style={styles.header}>
            <Header />

            <Text style={styles.title}>Em qual ambiente</Text>
            <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
         </View>

         <View>
            <FlatList 
               data={enviroments}
               keyExtractor={item => item.key}
               renderItem={({ item }) => 
                  <EnviromentButton 
                     title={item.title} 
                     active={item.key === enviromentSelected}
                     onPress={() => handleEnviromentSelected(item.key)}
                  />
               }
               horizontal
               showsHorizontalScrollIndicator={false}
               contentContainerStyle={styles.enviromentList}
            />
         </View>

         <View style={styles.plants}>
            
            <FlatList 
               data={filteredPlants}
               keyExtractor={item => String(item.id)}
               renderItem={({ item }) => 
                  <PlantCardPrimary 
                     data={{ name: item.name, photo: item.photo }}
                     onPress={() => navigateToDetail(item)}
                  />
               }
               showsVerticalScrollIndicator={false}
               numColumns={2}
               contentContainerStyle={{ paddingBottom: 40 }}
               refreshing={refreshing}
               onRefresh={onRefresh}
               onEndReached={() => getPlants()}
               onEndReachedThreshold={0.01}
               ListFooterComponent={
                  apiLoading ? <ActivityIndicator color={colors.gray} size="large"/> : null
               }
            />
         </View>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.background
   },
   header: {
      paddingHorizontal: 30,
   },
   title: {
      fontSize: 17,
      color: colors.heading,
      fontFamily: fonts.heading,
      lineHeight: 20,
      marginTop: 15,
   },
   subtitle: {
      fontFamily: fonts.text,
      fontSize: 17,
      lineHeight: 20,
      color: colors.heading
   },
   enviromentList: {
      height: 40,
      justifyContent: 'center',
      paddingHorizontal: 32,
      marginVertical: 32,
   },
   plants: {
      flex: 1,
      paddingHorizontal: 32,
      justifyContent: 'center'
   },
});
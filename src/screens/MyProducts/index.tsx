import React, { useEffect, useState } from 'react';

import { Container } from './styles';

import { useNavigation } from '@react-navigation/native';

import { BackButton } from '@screens/UpdateProfile/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import { Order, OrderProps } from '@components/Controllers/EditOrders';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { FlatList } from 'react-native';
import { Text } from 'react-native'; 

import { styles } from './styles'; 

export function MyProducts() {

    const [orders, setOrders] = useState<OrderProps[]>([]);
    
    const navigation = useNavigation();
   
    const theme = useTheme();

    const userId = auth().currentUser?.uid;

    useEffect(() => {
        let ref = firestore()
        .collection('productss')
        .where("userId", "==", userId)
        .onSnapshot((querySnapshot: { docs: any[]; }) => {
            const data = querySnapshot.docs.map(doc => {
              return {
                id: doc.id,
                ...doc.data()
              }
            }) as any; 
              setOrders(data);
          });
      
          return () => ref();
        }, []);


  return (
    <Container>
    <Text style={styles.title}>
    <BackButton onPress={() => navigation.goBack()}>
    <MaterialIcons name="arrow-back" size={24} color={theme.COLORS.PRIMARY} />
    </BackButton>  Meus Produtos </Text>
    <Text/>
    
         <FlatList
            data={orders}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            numColumns={2}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Order data={item} />}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
          />
    
    </Container>
  );
}

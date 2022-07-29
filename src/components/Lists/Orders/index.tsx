import React, { useEffect, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform } from 'react-native';

import firestore from '@react-native-firebase/firestore';

import { Load } from '@components/Animations/Load';
import { Filters } from '@components/Controllers/Filters';
import { Order, OrderProps } from '@components/Controllers/Order';
import { Container, Header, Title, Counter } from './styles';

import { Input } from './input';
import { Content } from '@screens/Home/styles';

export function Orders() {
  const [tipo, setTipo] = useState('doce');

  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<OrderProps[]>([]);

  const [searchText, setSearchText] = useState("");

  const [filteredOrders, setFilteredOrders] = useState<OrderProps[]>(orders);

  
  useEffect(() => {
    setIsLoading(true);

    const subscribe = firestore().collection('productss')
    .where('tipo', '==', tipo)
    .onSnapshot(querySnapshot => {
      const data = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }) as OrderProps[];

        setFilteredOrders(data);
        setOrders(data);
        setIsLoading(false);
    });

    return () => subscribe();
  }, [tipo]);

  const searchFilter = (text: any) => {
    if(text) {
      const newData = orders.filter((item) => {
        const itemData = item.nome ? 
        item.nome.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
      setFilteredOrders(newData);
      setSearchText(text)
    } else {
      setFilteredOrders(orders);
      setSearchText(text)
    }
  } 

  return (<>
    
    <Input
      value={searchText}
      placeholder={'Busque por um produto...'}
      onChangeText={(text) => searchFilter(text)}
    />
    
    <Container>
    
      <Filters onFilter={setTipo} searchText={setSearchText}/>
      
      <Header>
        <Title> Produtos { tipo == 'doce' ?
        'Doces'
        :  'Salgados'}</Title>
        <Counter>{orders.length}</Counter>
      </Header>
     
      {
        isLoading ?
          <Load />
          : <FlatList
            data={filteredOrders}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            numColumns={2}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Order data={item} />}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
          />
      }
      
    </Container>
    
    </>
  );
}

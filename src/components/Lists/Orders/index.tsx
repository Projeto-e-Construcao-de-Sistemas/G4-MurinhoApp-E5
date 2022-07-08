import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import firestore from '@react-native-firebase/firestore';

import { Load } from '@components/Animations/Load';
import { Filters } from '@components/Controllers/Filters';
import { Order, OrderProps } from '@components/Controllers/Order';
import { Container, Header, Title, Counter } from './styles';

export function Orders() {


  const [tipo, setTipo] = useState('doce');

  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<OrderProps[]>([]);

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

        setOrders(data);
        setIsLoading(false);
    });

    return () => subscribe();
  }, [tipo]);

  return (
    <Container>
      <Filters onFilter={setTipo} />

      <Header>
        <Title>Produtos { tipo === 'doce' ?
        'Doces'
        :  'Salgados'}</Title>
        <Counter>{orders.length}</Counter>
      </Header>

      {
        isLoading ?
          <Load />
          : <FlatList
            data={orders}
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
  );
}

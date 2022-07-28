import React, { useEffect, useState } from 'react';

import { Container } from './styles';

import { useNavigation } from '@react-navigation/native';

import { BackButton } from '@screens/UpdateProfile/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import { Compra, compraProps } from '@components/Controllers/purchases';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { FlatList } from 'react-native';
import { Text } from 'react-native';

import { styles } from './styles';

export function minhasCompras() {
    const [compras, setcompras] = useState<compraProps[]>([]);

    const navigation = useNavigation();

    const theme = useTheme();

    const userId = auth().currentUser?.uid;

    useEffect(() => {
        let ref = firestore()
        .collection('accounts').doc(userId).collection('minhasCompras')
        .onSnapshot((querySnapshot: { docs: any[]; }) => {
            const data = querySnapshot.docs.map(doc => {
              return {
                id: doc.id,
                ...doc.data()
              }
            }) as any;
              setcompras(data);
          });

          return () => ref();
        }, []);


  return (
    <Container>
    <Text style={styles.title}>
    <BackButton onPress={() => navigation.goBack()}>
    <MaterialIcons name="arrow-back" size={24} color={theme.COLORS.PRIMARY} />
    </BackButton>  Minhas Compras </Text>
    <Text/>

         <FlatList
            data={compras}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            numColumns={2}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Compra data={item} />}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
          />

    </Container>
  );
}

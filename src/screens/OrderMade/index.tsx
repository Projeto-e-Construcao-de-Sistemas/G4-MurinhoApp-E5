import React, { useEffect, useState } from 'react';

import { Container } from './styles';

import { useNavigation } from '@react-navigation/native';

import { BackButton } from '@screens/UpdateProfile/styles';
import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from 'styled-components/native';

import { Order, OrderProps } from '@components/Controllers/EditOrders';


import { Text, View } from 'react-native'; 

import firestore from '@react-native-firebase/firestore';

import { styles } from './styles'; 
import { HomeTagProfileButton } from '@components/Controllers/HomeTagProfileButton';

export function OrderMade(this: any, {route}: any) {

    const [orders, setOrders] = useState<OrderProps[]>([]);

    const [telefoneVendedor, setTelefoneVendedor] = useState('');
    
    const navigation = useNavigation();
   
    const data = route.params;

    const theme = useTheme();

    const codigo =  Math.floor(Math.random() * (4000 - 1000) + 1000)

   
    
    function retornaTelefoneVendedor() { firestore()
      .collection('accounts')
      .doc(data.userId)
      .get()
      .then(documentSnapshot => getUserTelefone(documentSnapshot))
      .then(telefone => {
      setTelefoneVendedor(telefone);
      });
      }

      function getUserTelefone(documentSnapshot:any) {
        return documentSnapshot.get('telefone') 
      }

    retornaTelefoneVendedor()
  
  return (
    <Container>
    <Text style={styles.title}>
      Confirmar Entrega
    </Text>
    <Text/>
    
         <Text style={styles.textt}>Pedido realizado!</Text>
         
         <Text style={styles.textt}>Entre em contato com o vendedor para definir a entrega.</Text>

         <Text/>
         <Text/>
         <View
              style={{
                flexDirection: 'row',
                marginVertical: 15,
              }}>
         <FontAwesome5 name='whatsapp' size={30} 
         style={{color: '#4086ff',
                 marginLeft: 60 }}/> 
         <Text/>
         <Text style={styles.telefoneVendedor}> {telefoneVendedor}</Text>
         </View>
         <Text/>
         
         <Text style={styles.textt}>Assim que realizar o pagamento,</Text>
         <Text style={styles.textt}>forneça o seguinte código ao vendedor.</Text>

         <Text/>
         <Text/>
         <Text style={styles.code}>                               {codigo}</Text>
         <Text/>
         <Text/>
         <Text/>
         <Text/>
         <Text/>
         <Text/>
         <Text/>
         <Text/>
         
         
        <View style={{
          marginLeft:120
        }}>
          <HomeTagProfileButton nome='home' title="Home" onPress={() => navigation.navigate('home')} />
        </View>
        

    </Container>
  );
}

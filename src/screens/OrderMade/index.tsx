import React, { useEffect, useState } from 'react';
import auth, { firebase } from '@react-native-firebase/auth';

import { Container } from './styles';

import { useNavigation } from '@react-navigation/native';

import { BackButton } from '@screens/UpdateProfile/styles';
import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

import { Alert } from 'react-native';



import { Order, OrderProps } from '@components/Controllers/EditOrders';

import { View, SafeAreaView, Image, Text,TextInput, StyleSheet } from 'react-native';

import firestore from '@react-native-firebase/firestore';

import theme from '../../theme';
import { styles } from './styles';
import { HomeTagProfileButton } from '@components/Controllers/HomeTagProfileButton';

export function OrderMade(this: any, {route}: any) {

    const [orders, setOrders] = useState<OrderProps[]>([]);

    const [telefoneVendedor, setTelefoneVendedor] = useState('');

    const navigation = useNavigation();

    const data = route.params;

    const theme = useTheme();



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

    retornaTelefoneVendedor();

    function handleDeleteOrder(){
      const compradorID= auth().currentUser?.uid;
      const vendedorID  = data.vendedorID;
      const  minhaCompraID = vendedorID+'-'+data.numeroPedido

      //ATUALIZA O PEDIDO PARA O COMPRADOR
      const resC = firestore().collection('accounts').doc(compradorID).collection('minhasCompras').doc(minhaCompraID).delete();


      //ATUALIZA O PEDIDO PARA O VENDEDOR
      const minhaVendaID = compradorID+'-'+ data.numeroPedido;
      const resV = firestore().collection('accounts').doc(vendedorID).collection('minhasVendas').doc(minhaVendaID).delete()

      Alert.alert("Pedido deletado e entrega cancelada");
      navigation.goBack();
    }

  return (

    <Container>
    <Text style={styles.backTitle} >
    <BackButton onPress={() => navigation.goBack()}>
    <MaterialIcons name="arrow-back" size={24} color={theme.COLORS.PRIMARY} />
    </BackButton>  Minhas Compras </Text>
    <Text/>

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

         <Text  style={styles.textt}>Sua forma de pagamento: {data.formaDePagamento}</Text>
         <Text style={styles.textt}>Assim que realizar o pagamento,</Text>
         <Text style={styles.textt}>forneça o seguinte código ao vendedor.</Text>

         <Text/>
         <Text/>
         <Text style={styles.code}>                               {data.codigo}</Text>
         <Text/>
         <Text/>
         <Text/>
         <Text/>
         <View>
         <TouchableOpacity onPress={()=> handleDeleteOrder()}>
         <View style={styles.buyBtn}>
             <Text
               style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>
               Cancelar entrega
             </Text>
           </View>
           </TouchableOpacity>
         </View>
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

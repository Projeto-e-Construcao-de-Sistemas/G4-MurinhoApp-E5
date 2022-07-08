import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Image, Text,TextInput, StyleSheet } from 'react-native';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import auth, { firebase } from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { HomeTagProfileButton } from '@components/Controllers/HomeTagProfileButton';
import { BackButton } from '@screens/UpdateProfile/styles';


import { MaterialIcons } from '@expo/vector-icons';
import theme from '../../theme';
import { styles } from './styles';
import { Container } from './styles';




import { TouchableOpacity } from 'react-native-gesture-handler';

export type vendaProps =  {
  item: string;
  valor: string;
  compradorID: string;
  numeroPedido : string;
  formaDePagamento: string;
  Status: string;
  codigo: string;
  telefoneVendedor: string;
  }

  type Props = {
    data: vendaProps;
  };


export function DetailsSale({route}: any) {

  const data = route.params;

  const navigation = useNavigation();

  const theme = useTheme();

  const [codigo, setCodigo] = useState('')


function handleDeleteOrder(){

        const vendedorID  = auth().currentUser?.uid;
        const  minhaCompraID = vendedorID+'-'+data.numeroPedido
        //ATUALIZA O PEDIDO PARA O COMPRADOR
        const resC = firestore().collection('accounts').doc(data.compradorID).collection('minhasCompras').doc(minhaCompraID).delete();


        //ATUALIZA O PEDIDO PARA O VENDEDOR
        const minhaVendaID = data.compradorID+'-'+ data.numeroPedido;
        const resV = firestore().collection('accounts').doc(vendedorID).collection('minhasVendas').doc(minhaVendaID).delete()

        Alert.alert("Pedido deletado e entrega cancelada");
        navigation.goBack();
  }

  function onClickConfirmarEntrega(){


        if(Number(codigo) == Number(data.codigo)){
          const vendedorID  = auth().currentUser?.uid;
          const  minhaCompraID = vendedorID+'-'+data.numeroPedido
          //ATUALIZA O PEDIDO PARA O COMPRADOR
          const resC = firestore().collection('accounts').doc(data.compradorID).collection('minhasCompras').doc(minhaCompraID
          ).update({Status: 'Concluído'});


          //ATUALIZA O PEDIDO PARA O VENDEDOR
          const minhaVendaID = data.compradorID+'-'+ data.numeroPedido;
          const resV = firestore().collection('accounts').doc(vendedorID).collection('minhasVendas').doc(minhaVendaID).update(
          {Status: 'Concluído'});
          navigation.goBack();
        }
        else       Alert.alert("Código errado!");
  }

  return (

    <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: '#FFFFFF',
    }}>
    <View style={{marginTop:'5%'}}>
    <Text style={styles.backTitle} >
    <BackButton onPress={() => navigation.goBack()}>
    <MaterialIcons name="arrow-back" size={24} color={'green'} />
    </BackButton>  Minhas vendas </Text>
    <Text/>
    </View>
    <Text style={styles.title}>
      Confirmar Entrega
    </Text>
    <Text/>
        <TextInput style={styles.TextInput} placeholder="Codigo" onChangeText={setCodigo} />

        <TouchableOpacity onPress={()=> onClickConfirmarEntrega()}>
        <View style={styles.buyBtn}>
            <Text
              style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>
              Confirmar entrega
            </Text>
          </View>

          </TouchableOpacity>
          <View style={{marginTop:'5%'}}>
          <TouchableOpacity onPress={()=> handleDeleteOrder()}>
          <View style={styles.buyBtn}>
              <Text
                style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>
                Cancelar entrega
              </Text>
            </View>
            </TouchableOpacity>
          </View>
          <View style={{marginTop:'5%'}}>
          <Text  style={styles.textt}>Forma de pagamento: {data.formaDePagamento}</Text>
          <Text  style={styles.textt}>Quantidade solcitada: {data.quantidade}</Text>
            <Text style={styles.textt}>Insira o código dado ao comprador para concluir a entrega.</Text>
          </View>

  </SafeAreaView>
  );
}

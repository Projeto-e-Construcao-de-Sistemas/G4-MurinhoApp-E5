import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Image, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import auth, { firebase } from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import CheckBox from '@react-native-community/checkbox';


import { MaterialIcons } from '@expo/vector-icons';
import theme from '../../theme';
import { v1 as uuidv1 } from 'uuid';
import { TouchableOpacity } from 'react-native-gesture-handler';



export type OrderProps =  {
  id:string;
  nome: string;
  descricao: string;
  tipo: string;
  quantidade: string;
  valor: string;
  foto: string;
  userId: string;
  like: boolean;
  }

  type Props = {
    data: OrderProps;
  };


export function Details({route}: any) {

  const data = route.params;

  const navigation = useNavigation();

  const theme = useTheme();

  const [countDetails, setCountDetails] = useState(0);

  const [togglePIXCheckBox, setTogglePIXCheckBox] = useState(false);

  const [toggleDINCheckBox, setToggleDINCheckBox] = useState(false);

  const [telefoneComprador, setTelefoneComprador] = useState('');

  const [telefoneVendedor, setTelefoneVendedor] = useState('');

  let [QTD,setQTD] = useState(Number(data.quantidade));
  let quantidade = Number(data.quantidade)


  const compradorID = auth().currentUser?.uid; //id do comprador



            async function retornaTelefoneComprador() { await firestore()
              .collection('accounts')
              .doc(compradorID)
              .get()
              .then(documentSnapshot => getUserTelefone(documentSnapshot))
              .then(telefone => {
                setTelefoneComprador(telefone);;
              });
              }

              async function retornaTelefoneVendedor() { await firestore()
                .collection('accounts')
                .doc(data.userId)
                .get()
                .then(documentSnapshot => getUserTelefone(documentSnapshot))
                .then(telefone => {
                  setTelefoneVendedor(telefone);;
                });
                }
              function getUserTelefone(documentSnapshot:any) {
                return documentSnapshot.get('telefone')
              }

              retornaTelefoneVendedor();
              retornaTelefoneComprador();

  function onClickCriarPedido(data:any){

        let formaDePagamento;
        const vendedorID = data.userId;
        const codigo = Math.floor(Math.random() * (4000 - 1000) + 1000) // o código de confirmação
        var numeroPedido=uuidv1();//DEFINE uma parte única para o ID do PEDIDO
        let minhaCompraID = vendedorID+'-'+numeroPedido; //a id do pedido para o comprador


        //CONFIRMA CAMPOS PREENCHIDOS
        if(!togglePIXCheckBox && !toggleDINCheckBox){
          Alert.alert("Escolha uma forma de pagamento");
          return;
        }
        if(countDetails<=0 || countDetails > quantidade){
          Alert.alert("Escolha uma quantidade válida");
          return;
        }

        //DEFINE FORMA DE PAGAMENTO
        if(togglePIXCheckBox){
          formaDePagamento="PIX";
        } else formaDePagamento="DINHEIRO";

        quantidade = quantidade - Number(countDetails);
        setQTD(quantidade);

        //REGISTRA O PEDIDO PARA O COMPRADOR
        const resC = firestore().collection('accounts').doc(compradorID).collection('minhasCompras').doc(minhaCompraID
        ).set({
        item: data.nome,
        valor: data.valor,
        vendedorID,
        numeroPedido, // vai ser usado para achar o id do pedido depois
        formaDePagamento,
        Status: 'Em aberto',
        codigo,
        telefoneVendedor,
        quantidade: countDetails
        });

        //AGORA REGISTRA O PEDIDO PARA O VENDEDOR
        const minhaVendaID = compradorID+'-'+ numeroPedido; //a id do pedido para o vendedor
        const resV = firestore().collection('accounts').doc(data.userId).collection('minhasVendas').doc(minhaVendaID).set(
        {
        item: data.nome,
        valor: data.valor,
        compradorID,
        numeroPedido, // vai ser usado para achar o id do pedido depois
        formaDePagamento,
        Status: 'Em aberto',
        codigo,
        telefoneComprador,
        quantidade: countDetails
        });
          Alert.alert("Pedido realizado com sucesso!");
        if(quantidade<=0){
          const resP = firestore().collection('productss').doc(data.id).delete();
          navigation.goBack();
        }
        else{
          const resP = firestore().collection('productss').doc(data.id).update({quantidade: quantidade.toString()})
        }


  }

  return (

    <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: '#FFFFFF',
    }}>
        <Text/>
    <View style={style.header}>
      <MaterialIcons name="arrow-back" size={28} onPress={() => navigation.goBack()} />
    </View>
    <View style={style.imageContainer}>
      <Text> Imagem </Text>
    </View>
    <View style={style.detailsContainer}>
      <View
        style={{
          marginLeft: 20,
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}>
      </View>
      <View
        style={{
          marginLeft: 20,
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 22, fontWeight: 'bold', marginTop:-75}}>{data.nome}</Text>
        <View style={style.priceTag}>
          <Text
            style={{
              marginLeft: 15,
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            R${data.valor}
          </Text>
        </View>
      </View>
      <View style={{paddingHorizontal: 20, marginTop: -10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Descrição</Text>
        <Text
          style={{
            color: 'grey',
            fontSize: 16,
            lineHeight: 22,
            marginTop: 10,
          }}>
          {data.descricao}
        </Text>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>

             <TouchableOpacity onPress={() => {if(countDetails>=1) setCountDetails(countDetails - 1)}}>
            <View style={style.borderBtn}>
              <Text style={style.borderBtnText}> - </Text>
            </View>
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 20,
                marginHorizontal: 10,
                fontWeight: 'bold',
              }}>
              {countDetails}
            </Text>
            <TouchableOpacity onPress={() => setCountDetails(countDetails + 1)}>
            <View style={style.borderBtn}>
              <Text style={style.borderBtnText}> + </Text>
            </View>
            </TouchableOpacity>
            <Text style={{marginLeft:'25%',fontSize: 22, fontWeight: 'bold' }}> QTD: {QTD}</Text>
          </View>
        </View>
        <Text/>

        <View
          style={{
            flexDirection: 'row',
            marginVertical: 15,
          }}>
              <CheckBox disabled={toggleDINCheckBox?true:false}
                value={togglePIXCheckBox}
                onValueChange={(newValue) => setTogglePIXCheckBox(newValue)}/>
              <Text style={{fontSize: 18}}>PIX                                  </Text>

              <CheckBox disabled={togglePIXCheckBox?true:false}
            value={toggleDINCheckBox}
            onValueChange={(newValue) => setToggleDINCheckBox(newValue)}/>
              <Text style={{fontSize: 18}}>DINHEIRO </Text>
        </View>

        <TouchableOpacity onPress={()=> onClickCriarPedido(data)}>
        <View style={style.buyBtn}>
            <Text
              style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>
              Comprar
            </Text>
          </View>
          </TouchableOpacity>
        <Text/>
        <Text/>
      </View>
    </View>
  </SafeAreaView>
  );
}

const style = StyleSheet.create({
    header: {
      paddingHorizontal: 20,
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    imageContainer: {
      flex: 0.45,
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    detailsContainer: {
      flex: 0.55,
      backgroundColor: theme.COLORS.LIGHT,
      marginHorizontal: 7,
      marginBottom: 7,
      borderRadius: 20,
      marginTop: 30,
      paddingTop: 30,
    },
    line: {
      width: 25,
      height: 2,
      backgroundColor: theme.COLORS.DARK,
      marginBottom: 5,
      marginRight: 3,
    },
    borderBtn: {
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      width: 60,
      height: 40,
    },
    borderBtnText: {fontWeight: 'bold', fontSize: 28},
    buyBtn: {
      width: 250,
      marginBottom:5,
      marginLeft:55,
      height: 40,
      backgroundColor: theme.COLORS.GREEN,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
    },
    priceTag: {
      backgroundColor: theme.COLORS.GREEN,
      width: 80,
      height: 40,
      justifyContent: 'center',
      borderTopLeftRadius: 25,
      borderBottomLeftRadius: 25,
    },
  });

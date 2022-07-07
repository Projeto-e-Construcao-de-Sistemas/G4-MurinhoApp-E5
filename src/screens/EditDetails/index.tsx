import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';


import { MaterialIcons } from '@expo/vector-icons';
import theme from '../../theme';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { HomeTagProfileButton } from '@components/Controllers/HomeTagProfileButton';

import { TextInput } from 'react-native-gesture-handler';

import { Content } from './styles';

export type OrderProps =  {
    id:string;
    nome: string;
    descricao: string;
    tipo: string;
    quantidade: string;
    valor: string;
    foto: string;
    like: boolean;
  }

  type Props = {
    data: OrderProps;
  };


export function EditDetails(this: any, {route}: any) {

  const data = route.params;

  const navigation = useNavigation();

  const theme = useTheme();

  const [nome, setNome] = useState(data.nome);
  const [descricao, setDescricao] = useState(data.descricao);
  const [quantidade, setQuantidade] = useState(data.quantidade);
  const [valor, setValor] = useState('');

/*
  async function handleUpdateProduct() {

    var snapshot = await firestore()
    .collection('productss')
    .get()

    snapshot.docs.map((doc) => {

    const product = doc.data();
    product.id = doc.id;

     firestore()
    .collection('productss')
    .doc(product.id)
    .update({
     id : doc.id
    })
    .then(() => updateProduct())
    .catch((error) => console.log(error))
    });
  }

*/
  function updateProduct() {
     firestore()
      .collection('productss')
      .doc(data.id)
      .update({
      nome: nome,
      valor: valor,
      descricao: descricao
    })
    .then(() => navigation.navigate('meusprodutos'))
    .catch((error) => console.log(error));
  }

  async function handleDeleteProduct() {
    await firestore()
      .collection('productss')
      .doc(data.id)
      .delete()
      .then(() => navigation.navigate('meusprodutos'))
      .catch((error) => console.log(error));
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
      <HomeTagProfileButton nome='save' title="Salvar Edições" onPress={updateProduct} />
      <HomeTagProfileButton nome='delete' title="Deletar Produto" onPress={handleDeleteProduct} />
    </View>
    <View style={style.imageContainer}>
      <Text> EDITAR IMAGEM </Text>
    </View>
    <View style={style.detailsContainer}>
    <View style={{paddingHorizontal: 20, marginTop: -10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Nome</Text>
        <Text/>
        <TextInput placeholder="Adicionar novo nome" onChangeText={setNome} />
        </View>
        <Text/>

      <View style={{paddingHorizontal: 20, marginTop: -10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Valor</Text>
        <Text/>
        <TextInput placeholder="R$ Valor" onChangeText={setValor} />
        </View>

        <Text/>

      <View style={{paddingHorizontal: 20, marginTop: -10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Descrição</Text>
        <Text/>

        <TextInput placeholder="Adicionar nova descrição" onChangeText={setDescricao}  />

        </View>

        <Text/>
        <Text/>

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
      height: 50,
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
    input: {
        height: 40,
        margin: 12,
        color: '#000000',
        padding: 10,
      },
  });

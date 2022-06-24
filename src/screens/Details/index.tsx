import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Image, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';

import { Alert } from 'react-native';


import { MaterialIcons } from '@expo/vector-icons';
import theme from '../../theme';


import AsyncStorage from "@react-native-community/async-storage"
import { TouchableOpacity } from 'react-native-gesture-handler';

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


export function Details({route}: any) {

  const data = route.params;

  const navigation = useNavigation();

  const theme = useTheme();

  const [countDetails, setCountDetails] = useState(0)

  function onClickAddCart(data:any){
    const itemcart ={
      product: data,
      quantity: countDetails,
      price: data.valor
    }

    
      Alert.alert("Produto(s) adicionado(s) com sucesso!")

   

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
      <MaterialIcons name="shopping-cart" size={28} onPress={() => navigation.navigate('cart', data)} />
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

             <TouchableOpacity onPress={() => setCountDetails(countDetails - 1)}>  
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
             
          </View>
        </View>
        <Text/>
        <TouchableOpacity onPress={()=> onClickAddCart(data)}>
        <View style={style.buyBtn}>
          
            <Text
              style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>
              Adicionar ao carrinho
            </Text>
           
          </View>
          </TouchableOpacity> 
          <TouchableOpacity onPress={() => navigation.navigate('cart', data)}> 
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
  });
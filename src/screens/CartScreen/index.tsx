import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

import CheckBox from '@react-native-community/checkbox';

import { useTheme } from 'styled-components/native';
import AsyncStorage from "@react-native-community/async-storage"

import theme from '../../theme';

import { PrimaryButton } from '@components/Controllers/Button';
import { useNavigation } from '@react-navigation/native';

const CartScreen = ({ route }:any) => {

    const data = route.params;

    const countDetails = route.params;

    const [togglePIXCheckBox, setTogglePIXCheckBox] = useState(false);

    const [toggleDINCheckBox, setToggleDINCheckBox] = useState(false);

    const [dataCart, setDataCart] = useState([])

    const [count, setCount] = useState(1);

    //console.log(countDetails.quantidade);

    //var size = Object.keys(countDetails).length;

    //console.log(size);

    const [price, setPrice] = useState(data.valor);

    const navigation = useNavigation();

    const theme = useTheme();

    function componentDidMount() {

      AsyncStorage.getItem("cart").then((cart) => {
        if (cart !== null){
          const cartproducts = JSON.parse(cart)
          setDataCart(cartproducts)
        }
      })

    }

    

  const CartCard = ({item}:any) => {
    return (
      <View style={style.cartCard}>
        <Image source={item.image} style={{height: 80, width: 80}} />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}>
           
          <Text style={{fontWeight: 'bold', fontSize: 16}}>{data.nome}</Text>
          <Text style={{fontSize: 13, color: theme.COLORS.GREY}}>
            {data.descricao}
          </Text>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>R${data.valor}</Text>
        </View>
        <View style={{marginRight: 20, alignItems: 'center'}}>


          <Text style={{fontWeight: 'bold', fontSize: 18}}>{count}</Text>
          <View style={style.actionBtn}>
            <TouchableOpacity onPress={() => setCount(count - 1)}>
            <MaterialIcons name="remove" size={25} color={theme.COLORS.white} />
            </TouchableOpacity >

            <TouchableOpacity onPress={() => setCount(count + 1)}>
            <MaterialIcons name="add" size={25} color={theme.COLORS.white} />
            </TouchableOpacity >
          </View>
        </View>
      </View>
    );
  };


  return (
    <SafeAreaView style={{backgroundColor: theme.COLORS.white, flex: 1}}>
        <Text/>
      <View style={style.header}>
        <MaterialIcons name="arrow-back" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>  Carrinho de Compras</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}
        data={data.valor}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <CartCard item={item} />}
        ListFooterComponentStyle={{paddingHorizontal: 20, marginTop: 20}}
        ListFooterComponent={() => (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 15,
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                Preço Total
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>R${count * data.valor}</Text>
            </View>
            <View>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                Escolher forma de pagamento: 
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 15,
              }}>
              <CheckBox disabled={false}
                value={togglePIXCheckBox}
                onValueChange={(newValue) => setTogglePIXCheckBox(newValue)}/>
              <Text style={{fontSize: 10 }}>PIX                                  </Text>
              
              <CheckBox disabled={false}
                value={toggleDINCheckBox}
                onValueChange={(newValue) => setToggleDINCheckBox(newValue)}/>
              <Text style={{fontSize: 10}}>DINHEIRO </Text>
            </View>
            
            <View style={{marginHorizontal: 30}}>
                <Text/>
              <PrimaryButton title="EFETUAR PEDIDO" nome={'home'}  onPress={() => navigation.navigate('pedidoefetuado', data)} />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};


const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: theme.COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: theme.COLORS.GREEN,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default CartScreen;
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Image, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import auth, { firebase } from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';

import { EditProfileButton } from '@components/Controllers/EditProfileButton';

import { ProfileHeader } from '@components/Layout/ProfileHeader';

import { BackButton } from '@screens/UpdateProfile/styles';

import { MaterialIcons } from '@expo/vector-icons';
import theme from '../../theme';

import { OrderStyleProps } from '@components/Controllers/Order/styles';

export type OrderProps = OrderStyleProps & {
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


export function Details() {

    const navigation = useNavigation();

    const theme = useTheme();
  
  return (
    <>
    <View style={style.header}>
        
    <BackButton onPress={() => navigation.goBack()}>
    <MaterialIcons name="arrow-back" size={24} color={theme.colors.text} />
    </BackButton>

    <MaterialIcons name="shopping-cart" size={24} color={theme.colors.text} />
    </View>
    <SafeAreaView>
        
    </SafeAreaView>
    </>
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
      width: 130,
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
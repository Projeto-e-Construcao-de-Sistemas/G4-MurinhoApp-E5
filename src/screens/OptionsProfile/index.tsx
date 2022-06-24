import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import auth, { firebase } from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';

import { EditProfileButton } from '@components/Controllers/EditProfileButton';
import { styles } from './styles';

import { ProfileHeader } from '@components/Layout/ProfileHeader';


import { OptionsProfileButton } from '@components/Controllers/OptionsProfileButton';
import { useTheme } from 'styled-components/native';
import { BackButton, Options } from '@screens/UpdateProfile/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { HomeTagProfileButton } from '@components/Controllers/HomeTagProfileButton';

export function OptionsProfile() {

  const navigation = useNavigation();

  const theme = useTheme();
  
  return (
    <>
    <ProfileHeader/>
    <View style={styles.container}>
        <Text/>
        <Text/>
        <Text/>
        <Text/>
        <OptionsProfileButton title="Meus Produtos" onPress={() => navigation.navigate('meusprodutos')}/>
        <OptionsProfileButton title="Minhas Compras" />
        <OptionsProfileButton title="Minhas vendas" />
        <OptionsProfileButton title="Configurações" onPress={() => navigation.navigate('profile')} />
        <Text/>
        <Text/>
        <Text/>
        <Options> 
        <HomeTagProfileButton  nome='home' title="Home" onPress={() => navigation.navigate('home')} />
        <HomeTagProfileButton nome=''  title="Tag" />
        <HomeTagProfileButton nome='person'  title="Profile" />
        </Options>
        

      </View>
    
    </>
  );
}
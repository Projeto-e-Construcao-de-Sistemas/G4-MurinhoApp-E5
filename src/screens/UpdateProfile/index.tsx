import React, { useEffect, useState } from 'react';
import { View, Text, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import auth from '@react-native-firebase/auth';
import { useTheme } from 'styled-components/native';

import firestore from '@react-native-firebase/firestore';

import { ContentRow, Options, styles } from './styles';

import { ProfileHeader } from '@components/Layout/ProfileHeader';

import { MaterialIcons } from '@expo/vector-icons';

import { Button } from '@components/Controllers/Button';

import { TextInput } from 'react-native-gesture-handler';
import { BackButton, BackText } from './styles';
import { Content } from './styles';
import { HomeTagProfileButton } from '@components/Controllers/HomeTagProfileButton';


export function UpdateProfile() {

    const theme = useTheme();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [CPF, setCPF] = useState('');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [campus, setCampus] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    async function handleUpdateProfile() {

    const userId = auth().currentUser?.uid;

    await firestore()
      .collection('accounts')
      .doc(userId)
      .update({
      email,
      password,
      nome,
      sobrenome, 
      telefone,
      CPF,
      campus
    })
    .then(() => navigation.navigate('home'))
    .catch((error) => console.log(error))
    .finally(() => setIsLoading(false));
   }

   async function handleDeleteAccount() {

    const userId = auth().currentUser?.uid;

    await firestore()
      .collection('accounts')
      .doc(userId)
      .delete()
      .then(() => auth().signOut())
      .then(() => navigation.navigate('signIn'))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
   }

   async function sairEDeslogar() {
    
    await navigation.navigate('signIn');
   }


  return (
    <>
    <ProfileHeader/>
    
    <View style={styles.container}>

    
    <Text style={styles.title}>
    <BackButton onPress={() => navigation.goBack()}>
    <MaterialIcons name="arrow-back" size={24} color={theme.COLORS.PRIMARY} />
    </BackButton> Editar dados pessoais:
    </Text>
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Content>
            <View style={styles.content}>
                <Text/>
                <Text/>
                <TextInput placeholder="E-mail" onChangeText={setEmail} />
                <Text/>
                <TextInput placeholder="Senha" secureTextEntry onChangeText={setPassword} />
                <Text/>
                <TextInput placeholder="Nome" onChangeText={setNome}/>
                <Text/>
                <TextInput placeholder="Sobrenome" onChangeText={setSobrenome}/>
                <Text/>
                <TextInput placeholder="Telefone" keyboardType='numeric' onChangeText={setTelefone}/>
                <Text/>
                <TextInput placeholder="CPF" keyboardType='numeric' onChangeText={setCPF}/>
                <Text/>
                <TextInput placeholder="Campus" onChangeText={setCampus}/>
            </View>
        </Content>
    </KeyboardAvoidingView> 
    
            <Options>
                <HomeTagProfileButton title="Salvar Edições" isLoading={isLoading} onPress={handleUpdateProfile} />
                <HomeTagProfileButton title="Deletar Conta" isLoading={isLoading} onPress={handleDeleteAccount} />
           </Options>
    </View>
    
    </>
  );
  }
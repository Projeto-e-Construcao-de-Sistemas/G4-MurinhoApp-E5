import React, { useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation} from '@react-navigation/native';

import auth from '@react-native-firebase/auth';
import { useTheme } from 'styled-components/native';

import firestore from '@react-native-firebase/firestore';

import { Options, styles } from './styles';

import { ProfileHeader } from '@components/Layout/ProfileHeader';

import { MaterialIcons } from '@expo/vector-icons';


import { TextInput } from 'react-native-gesture-handler';
import { BackButton } from './styles';

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
      email: email,
      password: password,
      nome: nome,
      sobrenome: sobrenome,
      telefone: telefone,
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
                <HomeTagProfileButton nome='save' title="Salvar Edições" isLoading={isLoading} onPress={handleUpdateProfile} />
                <HomeTagProfileButton nome='delete' title="Deletar Conta" isLoading={isLoading} onPress={handleDeleteAccount} />
           </Options>
    </View>

    </>
  );
  }

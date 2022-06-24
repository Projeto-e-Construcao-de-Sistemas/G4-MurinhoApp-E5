import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';

import { EditProfileButton } from '@components/Controllers/EditProfileButton';
import { styles } from './styles';

import { ProfileHeader } from '@components/Layout/ProfileHeader';

import { Options } from '@components/Controllers/NewOrder/styles';
import { HomeTagProfileButton } from '@components/Controllers/HomeTagProfileButton';

import { useTheme } from 'styled-components/native';

import { BackButton } from '@screens/UpdateProfile/styles';
import { MaterialIcons } from '@expo/vector-icons';


export function Profile() {

  const navigation = useNavigation();

  const theme = useTheme();

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [CPF, setCPF] = useState('');
  const [campus, setCampus] = useState('');
  const [telefone, setTelefone] = useState('');
  

  const userId = auth().currentUser?.uid;

  useEffect(() => {
    retornaNome();
    retornaSobrenome();
    retornaEmail();
    retornaCPF();
    retornaCampus();
    retornaTelefone();
  },[]);

  function getUserName(documentSnapshot:any) {
    return documentSnapshot.get('nome') 
  }

  function getUserSurname(documentSnapshot:any) {
    return documentSnapshot.get('sobrenome') 
  }

  function getUserEmail(documentSnapshot:any) {
    return documentSnapshot.get('email') 
  }

  function getUserCPF(documentSnapshot:any) {
    return documentSnapshot.get('CPF') 
  }

  function getUserCampus(documentSnapshot:any) {
    return documentSnapshot.get('campus') 
  }

  function getUserTelefone(documentSnapshot:any) {
    return documentSnapshot.get('telefone') 
  }

  
  function retornaNome()  { firestore()
    .collection('accounts')
    .doc(userId)
    .get()
    .then(documentSnapshot => getUserName(documentSnapshot))
    .then(nome => {
    setNome(nome)
    });
    }

  function retornaSobrenome()  { firestore()
      .collection('accounts')
      .doc(userId)
      .get()
      .then(documentSnapshot => getUserSurname(documentSnapshot))
      .then(sobrenome => {
      setSobrenome(sobrenome)
      });
    }

  function retornaEmail() { firestore()
      .collection('accounts')
      .doc(userId)
      .get()
      .then(documentSnapshot => getUserEmail(documentSnapshot))
      .then(email => {
      setEmail(email);
      });
  }

  function retornaCPF()  { firestore()
    .collection('accounts')
    .doc(userId)
    .get()
    .then(documentSnapshot => getUserCPF(documentSnapshot))
    .then(CPF => {
    setCPF(CPF);
    });
  }

  function retornaCampus() { firestore()
    .collection('accounts')
    .doc(userId)
    .get()
    .then(documentSnapshot => getUserCampus(documentSnapshot))
    .then(campus => {
    setCampus(campus);
    });
    }

    function retornaTelefone() { firestore()
      .collection('accounts')
      .doc(userId)
      .get()
      .then(documentSnapshot => getUserTelefone(documentSnapshot))
      .then(telefone => {
      setTelefone(telefone);
      });
      }
     
  return (
    <>
    
    <ProfileHeader/>
    
    <View style={styles.container}>
    
    <Text style={styles.title}>
    <BackButton onPress={() => navigation.goBack()}>
    <MaterialIcons name="arrow-back" size={24} color={theme.COLORS.PRIMARY} />
    </BackButton> Dados pessoais:
            
    </Text>
          <EditProfileButton title="Editar Perfil" onPress={() => navigation.navigate('editprofile')} />
          <View style={styles.content}>
          
          <Text style={styles.userdata}>
            Nome: {nome} {sobrenome}
          </Text>
          <Text style={styles.userdata}>
            E-mail: {email}
          </Text>
          <Text style={styles.userdata}>
            CPF: {CPF}
          </Text>
          <Text style={styles.userdata}>
           Campus: {campus}
          </Text>
          <Text style={styles.userdata}>
           Telefone: {telefone}
          </Text>

        
        <Text/>
        <Options> 
        <HomeTagProfileButton nome="home" onPress={() => navigation.navigate('home')} title={''} />
        <HomeTagProfileButton nome="" title="Tag" />
        <HomeTagProfileButton nome="person" title="Profile" onPress={() => navigation.navigate('profile')} />
        </Options>
      
      </View>
    </View>
    </>
  );
}
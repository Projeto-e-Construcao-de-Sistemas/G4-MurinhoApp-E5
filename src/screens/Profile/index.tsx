import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import auth, { firebase } from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';

import { EditProfileButton } from '@components/Controllers/EditProfileButton';
import { styles } from './styles';

import { ProfileHeader } from '@components/Layout/ProfileHeader';

import { Options } from '@components/Controllers/NewOrder/styles';
import { HomeTagProfileButton } from '@components/Controllers/HomeTagProfileButton';


export function Profile() {

  const navigation = useNavigation();


  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [CPF, setCPF] = useState('');
  const [campus, setCampus] = useState('');
  const [telefone, setTelefone] = useState('');
  

  const userId = auth().currentUser?.uid;

  React.useEffect(() => {
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
            Dados pessoais:
            
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

        

        <Options> 
        <HomeTagProfileButton title="Home" onPress={() => navigation.navigate('home')} />
        <HomeTagProfileButton title="Tag" />
        <HomeTagProfileButton title="Profile" onPress={() => navigation.navigate('profile')} />
        </Options>
      
      </View>
    </View>
    </>
  );
}
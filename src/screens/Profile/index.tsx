import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

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
  const [CEP, setCEP] = useState('');
  const [telefone, setTelefone] = useState('');


  const userId = auth().currentUser?.uid;

  useEffect(() => {
    retornaNome();
    retornaSobrenome();
    retornaEmail();
    retornaCEP();
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

  function getUserCEP(documentSnapshot:any) {
    return documentSnapshot.get('CEP')
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
    setNome(nome);
    });
    }

  function retornaSobrenome()  { firestore()
      .collection('accounts')
      .doc(userId)
      .get()
      .then(documentSnapshot => getUserSurname(documentSnapshot))
      .then(sobrenome => {
      setSobrenome(sobrenome);
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

  function retornaCEP()  { firestore()
    .collection('accounts')
    .doc(userId)
    .get()
    .then(documentSnapshot => getUserCEP(documentSnapshot))
    .then(CEP => {
    setCEP(CEP);
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
            CEP: {CEP}
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

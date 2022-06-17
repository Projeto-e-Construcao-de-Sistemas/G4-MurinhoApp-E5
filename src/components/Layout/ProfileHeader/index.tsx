import React, {useState, useEffect} from 'react';
import { View, Text, Image } from 'react-native';

import auth, { firebase } from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';


import { styles } from './styles';

export function ProfileHeader() {

  const userId = auth().currentUser?.uid;

  const [nome, setNome] = useState('');

  React.useEffect(() => {
    retornaNome();
  },[nome]); //add pelo warning, n sei se resolveu

  function getUserName(documentSnapshot:any) {
    return documentSnapshot.get('nome') 
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.welcome}>
        <Text style={styles.title}>Sua conta</Text>
          <Text style={styles.subtitle}>Olá, {nome}</Text>
        </View>
      </View>
    </View>
  );
}
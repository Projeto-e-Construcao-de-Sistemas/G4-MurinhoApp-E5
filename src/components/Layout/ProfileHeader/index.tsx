import React, {useState, useEffect} from 'react';
import { View, Text, Image } from 'react-native';

import auth, { firebase } from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';


import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from 'styled-components/native';
import { styles } from './styles';

export function ProfileHeader() {

  const navigation = useNavigation();

  const userId = auth().currentUser?.uid;

  const [nome, setNome] = useState('');

  const theme = useTheme();

  React.useEffect(() => {
    retornaNome();
  },[nome]);

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
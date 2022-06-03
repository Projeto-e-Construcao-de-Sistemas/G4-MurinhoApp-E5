import React, {useState} from 'react';

import auth, { firebase } from '@react-native-firebase/auth';

import { LogoutButton } from '@components/Controllers/LogoutButton';
import { Container, Greeting, Title, SubTitle } from './styles';

import firestore from '@react-native-firebase/firestore';
import { Button } from '@components/Controllers/Button';

type Profile = {
  nome: string;
  sobrenome: string;
  email: string;
  password: string;
  telefone: number;
  CPF: number;
  campus: string;
}

export function Header() {

  const [nome, setNome] = useState('');

  const userId = auth().currentUser?.uid;
  

  function getUserName(documentSnapshot:any) {
      return documentSnapshot.get('nome');
  }

    const receber = async () => { firestore()
    .collection('accounts')
    .doc(userId)
    .get()
    .then(documentSnapshot => getUserName(documentSnapshot))
    .then(nome => {
    setNome(nome);
    });
    }

  function handleSignOut() { 
    auth().signOut();
  }


  return (
    <Container>
      <Greeting>
        <Title>MurinhoApp</Title>
        <SubTitle>De universitários para universitários.</SubTitle>
        <Title>{nome}</Title>
      </Greeting>
      <LogoutButton onPress={handleSignOut} />
    </Container>
  );
}
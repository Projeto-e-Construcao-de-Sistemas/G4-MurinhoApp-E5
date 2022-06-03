import React, { useState } from 'react';
import { Alert } from 'react-native';

import auth from '@react-native-firebase/auth';

import { Button } from '@components/Controllers/Button';
import { Input } from '@components/Controllers/Input';
import { Form, Title } from './styles';

import ModalDropdown from 'react-native-modal-dropdown';

import firestore from '@react-native-firebase/firestore';
import { nativeViewGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/NativeViewGestureHandler';


export function AccountForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [CPF, setCPF] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [campus, setCampus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

   async function handleNewAccount() {
     
      setIsLoading(true);
      
      const newUser = await auth().createUserWithEmailAndPassword(email, password)

      await firestore()
      .collection('accounts')
      .doc(newUser.user.uid)
      .set({
      email,
      password,
      nome,
      sobrenome, 
      telefone,
      CPF,
      campus
    })
    .then(() => Alert.alert("Conta", "Cadastrado com sucesso!"))
    .catch((error) => console.log(error))
    .finally(() => setIsLoading(false));

   }


  return (
    <Form>
      <Title>Cadastrar</Title>
      <Input placeholder="E-mail" onChangeText={setEmail} />
      <Input placeholder="Senha" secureTextEntry onChangeText={setPassword} />
      <Input placeholder="Nome" onChangeText={setNome}/>
      <Input placeholder="Sobrenome" onChangeText={setSobrenome}/>
      <Input placeholder="Telefone" keyboardType='numeric' onChangeText={setTelefone}/>
      <Input placeholder="CPF" keyboardType='numeric' onChangeText={setCPF}/>
      <Input placeholder="Campus" onChangeText={setCampus}/>
    
      <Button title="Cadastrar" isLoading={isLoading} onPress={handleNewAccount} />
    </Form>
  );
}
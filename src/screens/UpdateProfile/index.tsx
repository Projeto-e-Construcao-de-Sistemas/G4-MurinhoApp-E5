import React, { useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import auth from '@react-native-firebase/auth';
import { useTheme } from 'styled-components/native';

import firestore from '@react-native-firebase/firestore';

import { Options, styles } from './styles';

import {DevSettings} from 'react-native';


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
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [telefone, setTelefone] = useState('');

    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newNome, setNewNome] = useState('');
    const [newSobrenome, setNewSobrenome] = useState('');
    const [newTelefone, setNewTelefone] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const userId = auth().currentUser?.uid;

    const navigation = useNavigation();

    useEffect(() => {
      retornaNome();
      retornaSobrenome();
      retornaEmail();
      retornaTelefone();
      retornaSenha();
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

    function getUserTelefone(documentSnapshot:any) {
      return documentSnapshot.get('telefone')
    }

    function getUserSenha(documentSnapshot:any) {
      return documentSnapshot.get('senha')
    }


    function retornaSenha()  { firestore()
      .collection('accounts')
      .doc(userId)
      .get()
      .then(documentSnapshot => getUserSenha(documentSnapshot))
      .then(senha => {
      setPassword(senha);
      });
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


      function retornaTelefone() { firestore()
        .collection('accounts')
        .doc(userId)
        .get()
        .then(documentSnapshot => getUserTelefone(documentSnapshot))
        .then(telefone => {
        setTelefone(telefone);
        });
        }

function handleUpdateProfile() {

    const userId = auth().currentUser?.uid;

    if((newNome =="" && newSobrenome=="" && newTelefone=="" && newEmail =="" && newPassword =="") ||
    (newNome ==nome && newSobrenome==sobrenome && newTelefone==telefone && newEmail ==email && newPassword ==password)){
      Alert.alert("Nada a alterar");return;
    }

    var alterEmail;
    var alterSenha;

    if (newEmail != email && newEmail!='') {
      alterEmail=true;

      if(!newEmail.match(/^.+@edu\.unirio\.br$/) && !newEmail.match(/^^.+@edu\.uniriotec\.br$/)){
        Alert.alert("Email inválido");return;
      }
         auth().currentUser?.updateEmail(newEmail).then(function() {
           Alert.alert("Email atualizado");
           setEmail(newEmail);
     }).catch(function(error) {
       Alert.alert("Não foi possível atualizar seu email");setIsLoading(false);return;
     });
    }

   if (newPassword != password && newPassword!="") {
     alterSenha=true;

     if(!newPassword.match(/^.{6,}$/)) {Alert.alert("A senha tem que ter 6 caracteres ou mais");return;}
        auth().currentUser?.updatePassword(newPassword).then(function() {
      Alert.alert("Senha atualizada")
      setPassword(newPassword);
    }).catch(function(error) {
      Alert.alert("Não foi possível atualizar sua senha");setIsLoading(false);return;
    });
   }

   if((newNome ==nome && newSobrenome==sobrenome && newTelefone==telefone) ||
   (newNome =='' && newSobrenome=='' && newTelefone=='') ){
     if(!alterEmail && !alterSenha){Alert.alert("Nada a alterar");return;}
   }

   if(!newTelefone.match(/^[0-9]?[0-9]{4}-?[0-9]{4}$/)) {Alert.alert("Telefone inválido");return;}

   updateFirestore(userId);
}

  async function updateFirestore(userId){
    await firestore()
      .collection('accounts')
      .doc(userId)
      .update({
      email: newEmail==''? email:newEmail,
      senha: newPassword==''? password:newPassword,
      nome: newNome==''?nome:newNome,
      sobrenome: newSobrenome==''?sobrenome:newSobrenome,
      telefone: newTelefone==''?telefone:newTelefone,
    })
    .then(() => {Alert.alert("Perfil alterado com sucesso!");
  setNome(newNome);setSobrenome(newSobrenome);setTelefone(newTelefone)})
    .catch((error) => setIsLoading(false));
   }


   async function handleDeleteAccount() {
     auth().currentUser?.delete().then(function() {
 })
 .then(() => FirestoreDelete())
 .catch(function(error) {
   Alert.alert("Não foi possível deletar sua conta");setIsLoading(false);return;
 });

   }

   async function FirestoreDelete(){
     await firestore()
       .collection('accounts')
       .doc(userId)
       .delete()
       .then(() => DevSettings.reload())
       .catch((error) => console.log(error))
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

        <Content>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={styles.content}>
                <Text/>
                <Text/>
                <Text/>
                <TextInput placeholder={"Email: "+email} onChangeText={setNewEmail} />
                <Text/>
                <Text/>
                  <TextInput placeholder={"Senha: "+password} secureTextEntry onChangeText={setNewPassword} />
                <Text/>
                <TextInput placeholder={"nome: "+nome} onChangeText={setNewNome}/>
                <Text/>
                <TextInput placeholder={"Sobrenome: "+sobrenome} onChangeText={setNewSobrenome}/>
                <Text/>
                <TextInput placeholder={"Telefone: "+telefone} keyboardType='numeric' onChangeText={setNewTelefone}/>
            </View>
          </KeyboardAvoidingView>
        </Content>
        <View>

        </View>

            <Options>
                <HomeTagProfileButton nome='save' title="Salvar Edições" isLoading={isLoading} onPress={handleUpdateProfile} />
                <HomeTagProfileButton nome='delete' title="Deletar Conta" isLoading={isLoading} onPress={handleDeleteAccount} />
           </Options>
    </View>

    </>
  );
  }

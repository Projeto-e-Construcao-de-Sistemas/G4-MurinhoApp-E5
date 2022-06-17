import React, { useState } from 'react';
import { Text, TextInput, View, ScrollView, Alert, StyleSheet } from 'react-native';

import auth from '@react-native-firebase/auth';

import { Button } from '@components/Controllers/Button';
import { Input } from '@components/Controllers/Input';
import { Form, Title } from './styles';

import * as yup from 'yup';
import {Formik} from 'formik';
import ModalDropdown from 'react-native-modal-dropdown';

import firestore from '@react-native-firebase/firestore';
import { nativeViewGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/NativeViewGestureHandler';




export function AccountForm() {

  var email='';
  var senha='';
  var CPF='';
  var nome='';
  var sobrenome='';
  var telefone='';
  var campus='';
  const [isLoading, setIsLoading] = useState(false);

   async function handleNewAccount() {

      setIsLoading(true);
      const newUser = await auth().createUserWithEmailAndPassword(email, senha)

      await firestore()
      .collection('accounts')
      .doc(newUser.user.uid)
      .set({
      email,
      senha,
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

   const loginValidationSchema = yup.object().shape({
   email: yup
     .string()
     .matches( /^.+@edu\.unirio\.br$/ || /^^.+@edu\.uniriotec\.br$/ , "Apenas e-mails da UNIRIO são válidos")
     .required('É necessário preencher todos os campos'),
   senha: yup
     .string()
     .required('É necessário preencher todos os campos'),
     cpf: yup
       .string()
       .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
     telefone: yup
       .string()
       .matches(/^[0-9]?[0-9]{4}-?[0-9]{4}$/, "Telefone inválido")
       .required('É necessário preencher todos os campos'),
     nome: yup
       .string()
       .matches(/^.*$/, "Digite um nome")
       .required('É necessário preencher todos os campos'),
       sobrenome: yup
         .string()
         .matches(/^.*$/, "Digite um sobrenome")
         .required('É necessário preencher todos os campos'),
     });


  return (
    <Formik
             validationSchema={loginValidationSchema}
             initialValues={{ nome: '',sobrenome:'', email: '',
             senha: '', cpf: '', telefone: '', campus: '' }}
             onSubmit={values => { email = values.email; senha = values.senha;
               nome = values.nome;sobrenome = values.sobrenome;
               CPF = values.cpf; telefone = values.telefone;
               campus = values.campus; handleNewAccount()}}
            >
             {({handleChange,handleBlur,handleSubmit,values, errors,isValid, }) => (
               <View>
               <TextInput
                         name="nome"
                         placeholder="Nome"
                         
                         onChangeText={handleChange('nome')}
                         onBlur={handleBlur('nome')}
                         value={values.nome}
                         style={style.TextInput}
                       />
                       {errors.nome &&
                         <Text style={{ fontSize: 10, color: 'red' }}>{errors.nome}</Text>
                       }
               <TextInput
                 name="Sobrenome"
                 placeholder="Sobrenome"
                 onChangeText={handleChange('sobrenome')}
                 onBlur={handleBlur('sobrenome')}
                 value={values.sobrenome}
                 style={style.TextInput}
               />
               {errors.sobrenome &&
                 <Text style={{ fontSize: 10, color: 'red' }}>{errors.sobrenome}</Text>
               }
               <TextInput
                 name="telefone"
                 placeholder="Digite seu telefone"
                 onChangeText={handleChange('telefone')}
                 onBlur={handleBlur('telefone')}
                 value={values.telefone}
                 style={style.TextInput}
               />
               {errors.telefone &&
                 <Text style={{ fontSize: 10, color: 'red' }}>{errors.telefone}</Text>
               }
               <TextInput
                 name="cpf"
                 placeholder="Digite seu CPF"
                 onChangeText={handleChange('cpf')}
                 onBlur={handleBlur('cpf')}
                 value={values.cpf}
                 style={style.TextInput}
               />
               {errors.cpf &&
                 <Text style={{ fontSize: 10, color: 'red' }}>{errors.cpf}</Text>
               }
                 <TextInput
                   name="email"
                   placeholder="Endereço de email"
                   onChangeText={handleChange('email')}
                   onBlur={handleBlur('email')}
                   value={values.email}
                   style={style.TextInput}
                 />
                 {errors.email &&
                   <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                 }
                 <TextInput
                   name="senha"
                   placeholder="Senha"
                   onChangeText={handleChange('senha')}
                   onBlur={handleBlur('senha')}
                   value={values.senha}
                   secureTextEntry
                   style={style.TextInput}
                 />
                 {errors.senha &&
                   <Text style={{ fontSize: 10, color: 'red' }}>{errors.senha}</Text>
                 }

                 <Button
                   title="Cadastrar"
                   isLoading={isLoading}
                   onPress={handleSubmit}
                   disabled={!isValid}
                 />
              </View>
             )}
      </Formik>
  );
}

    const style = StyleSheet.create({
    loginContainer: {
      width: '80%',
      alignContent: 'center',
      paddingLeft: '15%'
    },

    TextInput: {
      height: 40,
      width: '100%',
      margin: 10,
      backgroundColor: 'white',
      borderColor: 'gray',
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 10,
  }})

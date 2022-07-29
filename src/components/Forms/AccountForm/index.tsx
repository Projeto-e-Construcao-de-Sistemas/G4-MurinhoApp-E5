import React, { useState } from 'react';
import { Text, TextInput, View, Alert, StyleSheet } from 'react-native';

import auth from '@react-native-firebase/auth';

import { Button } from '@components/Controllers/Button';

import { getAddressByCEP } from 'cep-address-finder'
import * as yup from 'yup';
import {Formik} from 'formik';

import { TouchableOpacity } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';


export function AccountForm() {

  var email='';
  var senha='';
  var CEP='';
  var nome='';
  var sobrenome='';
  var telefone='';
  const [isLoading, setIsLoading] = useState(false);
  var [state,setState] = useState('');
  var [rj,setRJ]=useState(false);

  

   async function handleNewAccount() {

     if(state==""){
       Alert.alert("Você precisa checar seu CEP");
       return;
     }

     if(rj==false){
       Alert.alert(" Você não pode frequentar a UNIRIO sem estar no Rio!");
       return;
     }

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
      CEP
    })
    .then(() => Alert.alert("Conta", "Cadastrado com sucesso!"))
    .catch((error) => console.log(error))
    .finally(() => setIsLoading(false));
  }

  function getEstado(cep){
          getAddressByCEP(cep).then(address => {
          setState(address.state);
       });
  }

     async function getcity(cep){

       if(!cep.match(/^\d{5}-?\d{3}$/)){Alert.alert("CEP inválido"); return;}

       getEstado(cep);
       getEstado(cep);

      if(state!="RJ"){setRJ(false); Alert.alert(state+" --> Você não pode frequentar a UNIRIO sem estar no Rio!")}
      else{setRJ(true);Alert.alert(state+" --> Tudo ok!")}
   }

   const loginValidationSchema = yup.object().shape({
   email: yup
     .string()
     .matches( /^.+@edu\.unirio\.br$/ || /^^.+@edu\.uniriotec\.br$/ , "Apenas e-mails da UNIRIO são válidos")
     .required('É necessário preencher todos os campos'),
   senha: yup
     .string()
     .matches(/^.{5}.*$/, "É necessário uma senha de 6 caracteres ou mais")
     .required('É necessário preencher todos os campos'),
     CEP: yup
       .string()
       .matches(/^\d{5}-?\d{3}$/, "CEP inválido (digite apenas números)"),
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
             senha: '', CEP: '', telefone: ''}}
             onSubmit={values => { email = values.email; senha = values.senha;
               nome = values.nome;sobrenome = values.sobrenome;
               CEP = values.CEP; telefone = values.telefone;
                handleNewAccount()}}
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
                     name="CEP"
                     placeholder="Digite seu CEP"
                     onChangeText={handleChange('CEP')}
                     onBlur={handleBlur('CEP')}
                     value={values.CEP}
                    style={style.TextInput}
                   />

                   {errors.CEP &&
                     <Text style={{ fontSize: 10, color: 'red' }}>{errors.CEP}</Text>
                   }

                       <TouchableOpacity style={{paddingLeft:'2%'}} onPress={()=> getcity(values.CEP)}>
                       <View style={{backgroundColor:'#008000',borderRadius: 30,marginRight:'72%'}}>
                           <Text
                             style={{paddingLeft: 10, fontSize: 15, fontWeight: 'bold',color: '#FFFFFF'}}>
                             Checar CEP
                           </Text>
                         </View>
                         </TouchableOpacity>

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
    CEP: {
      flexDirection:'row'
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

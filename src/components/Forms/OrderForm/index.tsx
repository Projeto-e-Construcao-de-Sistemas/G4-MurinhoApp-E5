import React, { useState, useRef, useEffect } from 'react';

import firestore from '@react-native-firebase/firestore';

import { Form, Title } from './styles';
import { Input } from '@components/Controllers/Input';
import { Button } from '@components/Controllers/Button';
import { TextArea } from '@components/Controllers/TextArea';
import { Alert } from 'react-native';

import { Picker } from '@react-native-picker/picker';


import auth, { firebase } from '@react-native-firebase/auth';

import { MaterialIcons } from '@expo/vector-icons';

import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import theme from '../../../theme';


export function OrderForm() {

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipo, setTipo] = useState('Doce');
  const [valor, setValor] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [like, setLike] = useState(false);

  const [id, setId] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const userId = auth().currentUser?.uid;

  function handleNewOrder() {
    setIsLoading(true);
    setLike(true);
    if(!nome.match("^.+$")) {Alert.alert("Digite um nome para o produto"); setIsLoading(false); return;}
    if(!descricao.match("^.{1,20}$")) {Alert.alert("Digite uma descrição de até 20 caracteres para o produto");setIsLoading(false); return;}
    if(!valor.match("^[0-9]+$")) {Alert.alert("Digite um valor válido para o produto"); setIsLoading(false);return;}
    if(!quantidade.match("^[0-9]+$")) {Alert.alert("Digite uma quantidade válida para o produto"); setIsLoading(false);return;}

    firestore()
    .collection('productss')
    .add({
      nome,
      descricao,
      tipo,
      valor,
      quantidade,
      like,
      userId: userId,
    })
    .then(() => Alert.alert("Produto","Produto cadastrado com sucesso!"))
    .catch((error) => console.log(error))
    .finally(() => setIsLoading(false));
    }



  return (
    <Form>
      <Title>Adicionar Produto</Title>
      <Input placeholder="Nome" onChangeText={setNome} />
      <TextArea placeholder="Descrição" onChangeText={setDescricao} />
      <Input placeholder="Preço unitário" onChangeText={setValor}/>
      <Input placeholder="Quantidade" onChangeText={setQuantidade}/>

      <TouchableOpacity>
      <View
        style={{
            flexDirection: 'row',
            marginVertical: 15,
            marginLeft:11
          }}>
          <MaterialIcons name='add-a-photo' size={24}/>
        <Text style={{marginTop:3,
        fontSize:15,
        color: theme.COLORS.SUBTEXT}}>  Adicionar Foto </Text>
      </View>
      </TouchableOpacity>

      <Picker
        selectedValue={tipo}
        style={{ borderColor: '#01030a', borderRadius:12, borderWidth: 1 ,fontFamily:'Inter_400Regular', color:"#8D919E"  }}
        onValueChange={(itemValue, itemIndex) =>
          setTipo(itemValue)}>
        <Picker.Item label="Doce" value="doce"/>
        <Picker.Item label="Salgado" value="salgado"/>
      </Picker>

      <Button title="Enviar produto" isLoading={isLoading} onPress={handleNewOrder} />
    </Form>
  );
}

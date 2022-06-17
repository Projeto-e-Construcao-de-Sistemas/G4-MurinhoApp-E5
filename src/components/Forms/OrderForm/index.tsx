import React, { useState, useRef } from 'react';

import firestore from '@react-native-firebase/firestore';

import { Form, Title } from './styles';
import { Input } from '@components/Controllers/Input';
import { Button } from '@components/Controllers/Button';
import { TextArea } from '@components/Controllers/TextArea';
import { Alert } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { Container } from '@screens/Home/styles';

export function OrderForm() {

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipo, setTipo] = useState('');
  const [valor, setValor] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [like, setLike] = useState(false);

  const [isLoading, setIsLoading] = useState(false);


  function handleNewOrder() {
    setIsLoading(true);
    setLike(true);

    firestore()
    .collection('productss')
    .add({
      nome,
      descricao,
      tipo,
      valor,
      quantidade,
      like
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
import React, { useState } from 'react';

import firestore from '@react-native-firebase/firestore';

import { Form, Title } from './styles';
import { Input } from '@components/Controllers/Input';
import { Button } from '@components/Controllers/Button';
import { TextArea } from '@components/Controllers/TextArea';
import { Alert } from 'react-native';

export function OrderForm() {
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');

  const [preco, setPreco] = useState('');
  const [tipo, setTipo] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ADICIONAR INFOS PRODUTO

  function handleNewOrder() {
    setIsLoading(true);

    firestore()
    .collection('products')
    .add({
      patrimony,
      description,
      status: 'open',
      created_at: firestore.FieldValue.serverTimestamp()
    })
    .then(() => Alert.alert("Produto","Produto cadastrado com sucesso!"))
    .catch((error) => console.log(error))
    .finally(() => setIsLoading(false));
    }

  return (
    <Form>
      <Title>Adicionar Produto</Title>
      <Input placeholder="Nome" onChangeText={setPatrimony} />
      <TextArea placeholder="Descrição" onChangeText={setDescription} />
      <Input placeholder="Preço" onChangeText={setPreco}/>
      <Input placeholder="Tipo" onChangeText={setTipo}/>
      
      <Button title="Enviar produto" isLoading={isLoading} onPress={handleNewOrder} />
    </Form>
  );
}
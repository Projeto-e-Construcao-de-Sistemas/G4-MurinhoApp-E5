import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Status,
  Content,
  Header,
  Title,
  Label,
  Info,
  Footer,
  OrderStyleProps
} from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';


export type OrderProps = OrderStyleProps & {
  id:string;
  nome: string;
  descricao: string;
  tipo: string;
  quantidade: string;
  valor: string;
  foto: string;
  like: boolean;
}

type Props = {
  data: OrderProps;
};

 export function Order({data}:Props) {

  const [like, setLike] = useState(data.like)

  const theme = useTheme();

  const navigations = useNavigation();


  return (
    <Container>
      <Status tipo={data.tipo} />
      <Content>
      <TouchableOpacity onPress={() => navigations.navigate('details', data)}>
        <Header>
          <Title>{data.nome}</Title>
          <TouchableOpacity onPress={() => navigations.navigate('editdetails', data)}>
            <MaterialIcons name='edit' size={24}/>
          </TouchableOpacity>
        </Header>
        <Footer>
          <Info>
            <Label>
              R$ {data.valor},00
            </Label>
          </Info>
          <Info>
        <Label>QTD:{data.quantidade}</Label>
          </Info>
        </Footer>
        </TouchableOpacity>
      </Content>
    </Container>
  );
}

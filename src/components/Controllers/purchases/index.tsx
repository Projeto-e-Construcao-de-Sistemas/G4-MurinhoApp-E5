import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

import {
  Container,
  Content,
  Header,
  Title,
  Label,
  Info,
  Footer
} from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';


export type compraProps = {
  id: string;
  item: string;
  valor: string;
  compradorID: string;
  numeroPedido : string;
  formaDePagamento: string;
  Status: string;
  codigo: string;
  telefoneVendedor: string;
}

type Props = {
  data: compraProps;
};

 export function Compra({data}:Props) {
  const theme = useTheme();
  const id=data.numeroPedido.substring(0,5);

  const navigations = useNavigation();


  return (
    <Container>
      <Content>
      <TouchableOpacity onPress={() => data.Status=="Em aberto"? navigations.navigate('OrderMade', data): Alert.alert("Venda concluida")}>
        <Header>
          <Title>{data.item}</Title>
        </Header>
        <Footer>
          <Info>
            <Label>
              R$ {data.valor},00
            </Label>
            <Label style={{marginLeft:'10%'}}>{id}</Label>
          </Info>
        </Footer>
        <Footer><Info><Info>
        <Label>
          {data.Status}
        </Label>
        </Info></Info></Footer>
        </TouchableOpacity>
      </Content>
    </Container>
  );
}

/*<MaterialIcons
name={data.status === "open" ? "hourglass-empty" : "check-circle"}
size={24}
color={data.status === "open" ? theme.COLORS.SECONDARY : theme.COLORS.PRIMARY}
/> ICONE TEMPO, VIRAR PREÇO

<Info>
            <MaterialIcons name="schedule" size={16} color={theme.COLORS.SUBTEXT} />
          </Info>
          ICONE RELOGIO

      <MaterialIcons name="my-location" size={16} color={theme.COLORS.SUBTEXT} />
            <Label>
              {data.patrimony}
            </Label> ICONE LOCALIZAÇÃO?
*/

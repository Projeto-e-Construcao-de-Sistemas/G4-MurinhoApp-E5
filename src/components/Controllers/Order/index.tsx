import React from 'react';
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

export function Order({ data }: Props) {
  const theme = useTheme();

  const navigation = useNavigation();


  return (
    <Container>
      <Status tipo={data.tipo} />
      <Content>
      <TouchableOpacity onPress={() => navigation.navigate('details')}>
        <Header>
          <Title>{data.nome}</Title>
        </Header>
        <Footer>
          <Info>
          <MaterialIcons
            name={"monetization-on"}
            size={24}
            color={data.tipo === 'doce' ? theme.COLORS.SECONDARY : theme.COLORS.PRIMARY}
            /> 
            <Label>
              {data.valor}
            </Label> 
          </Info>
          <Info>
          <MaterialIcons
            name={data.like ? "favorite" : "favorite-border"}
            size={24}
            /> 
          </Info>
        </Footer>
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
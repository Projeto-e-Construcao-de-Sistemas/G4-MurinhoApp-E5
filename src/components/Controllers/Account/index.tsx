import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

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


export type AccountProps = {
  email: string;
  password: string;
  nome: string;
  sobrenome: string;
  telefone: number;
  CPF: number;
  campus: string;
}

type Props = {
  data: AccountProps;
};

export function Order({ data }: Props) {
  const theme = useTheme();

  return (
    <Container>
      <Title>{data.nome}</Title>
    </Container>
  );
}
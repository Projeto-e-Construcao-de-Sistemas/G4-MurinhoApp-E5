import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title, Load } from './styles';

import { useTheme } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

type Props = RectButtonProps & {
  title: string;
  isLoading?: boolean;
  nome: string;
};

export function HomeTagProfileButton({ title, isLoading = false, nome ,...rest }: Props) {

  const { COLORS } = useTheme();

  return (
    <Container enabled={!isLoading} {...rest}>
      {isLoading ? <Load /> : <MaterialIcons name={nome} size={23} color={COLORS.WHITE} />}
    </Container>
  )
}

//{isLoading ? <Load /> : <Title>{title}</Title>}
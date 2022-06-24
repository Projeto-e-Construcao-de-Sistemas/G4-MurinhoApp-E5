import React from 'react';
import { useTheme } from 'styled-components/native';

import { Filter } from '@components/Controllers/Filter';
import { Container, Title, Options } from './styles';

type Props = {
  onFilter: (status: string ) => void;
}

export function Filters({ onFilter }: Props) {
  const theme = useTheme();

  return (
    <Container>
      <Title>Filtre pelo tipo de produto</Title>

      <Options>
        <Filter
          title="Doce"
          backgroundColor={theme.COLORS.SECONDARY}
          onPress={() => onFilter('doce')}
        />

        <Filter
          title="Salgado"
          backgroundColor={theme.COLORS.PRIMARY}
          onPress={() => onFilter('salgado')}
        />

        <Filter
          title="Favoritos"
          backgroundColor={theme.COLORS.ROXO}
          onPress={() => onFilter('favorito')}
        />

      </Options>
    </Container>
  );
}
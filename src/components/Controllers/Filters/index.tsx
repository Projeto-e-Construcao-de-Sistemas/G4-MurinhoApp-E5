import React, { useEffect } from 'react';
import { useTheme } from 'styled-components/native';

import { Filter } from '@components/Controllers/Filter';
import { Container, Title, Options } from './styles';

type Props = {
  onFilter: (status: string ) => void;
  searchText: (text: string ) => void;
}

export function Filters({ onFilter, searchText }: Props) {
  const theme = useTheme();

  
  const filterAccordingToFilter = (tipo:any) => {
    onFilter(tipo)
    searchText("");
  }

  return (
    <Container>
      <Title>Filtre pelo tipo de produto</Title>

      <Options>
        <Filter
          title="Doce"
          backgroundColor={theme.COLORS.SECONDARY}
          onPress={() => filterAccordingToFilter('doce')}
        />

        <Filter
          title="Salgado"
          backgroundColor={theme.COLORS.PRIMARY}
          onPress={() => filterAccordingToFilter('salgado')}
        />

      </Options>
    </Container>
  );
}

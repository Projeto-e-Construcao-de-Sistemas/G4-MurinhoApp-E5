import React from 'react';
import { TextInputProps } from 'react-native';

import { Containerx } from './styles';

export function Input({ ...rest }: TextInputProps) {
  return <Containerx {...rest} />
}
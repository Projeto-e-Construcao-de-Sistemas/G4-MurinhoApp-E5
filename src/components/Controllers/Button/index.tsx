import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RectButtonProps, TouchableOpacity } from 'react-native-gesture-handler';

import { Container, Title, Load } from './styles';

import theme from '../../../theme';

type Props = RectButtonProps & {
  title: string;
  isLoading?: boolean;
};

export function Button({ title, isLoading = false, ...rest }: Props) {
  return (
    <Container enabled={!isLoading} {...rest}>
      {isLoading ? <Load /> : <Title>{title}</Title>}
    </Container>
  )
} 

export function PrimaryButton ({title, onPress = () => {}}: any) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={style.btnContainer}>
        <Text style={style.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  title: {color: theme.COLORS.white, fontWeight: 'bold', fontSize: 18},
  btnContainer: {
    backgroundColor: theme.COLORS.GREEN,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

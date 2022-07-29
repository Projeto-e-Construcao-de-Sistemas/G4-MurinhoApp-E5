import React from 'react';
import { KeyboardAvoidingView, Platform, Image, View, Text } from 'react-native';

import { SignInForm } from '@components/Forms/SignInForm';


import { Container, Content, SubTitle, Title } from './styles';

export function SignIn() {
  return (
    <Container>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Content>
          <Text/>
        <View
          style={{
          flexDirection: 'row',
          }}>
            <Title>MurinhoApp</Title>
            <Image source={require('../../assets/animations/logomurinho.android.png')}/>
        </View>
          <SubTitle>Murinho virtual para estudantes da UNIRIO.</SubTitle>
          <SignInForm />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
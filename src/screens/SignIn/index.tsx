import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { SignInForm } from '@components/Forms/SignInForm';


import { Container, Content, SubTitle, Title } from './styles';

export function SignIn() {
  return (
    <Container>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Content>
          <Title>MurinhoApp</Title>
          <SubTitle>Murinho virtual para estudantes da UNIRIO.</SubTitle>
          <SignInForm />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
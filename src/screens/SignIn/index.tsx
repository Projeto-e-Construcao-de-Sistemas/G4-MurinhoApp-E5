import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import signInAnimation from '@assets/animations/signin.json';
import IllustrationSvg from '@assets/animations/murinhologoap.json';

import { SignInForm } from '@components/Forms/SignInForm';
import { Lottie } from '@components/Animations/Lottie';


import { Container, Content, SubTitle } from './styles';

export function SignIn() {
  return (
    <Container>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Content>
          <Lottie source={signInAnimation} />
          <SubTitle>Murinho virtual para estudantes da UNIRIO.</SubTitle>
          <SignInForm />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
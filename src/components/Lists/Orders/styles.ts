import styled from 'styled-components/native';
import { TextInput, TextInputProps } from 'react-native';


export const Container = styled.View`
  flex: 1;
  margin-top: 44px;   
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: ${({ theme }) => theme.COLORS.TEXT};
  margin-bottom: 12px;
`;

export const Counter = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.SUBTEXT};
  margin-bottom: 12px;
`;


export const InputContainer = styled.Text`
  width: 100%;
  height: 56px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 12px;
  font-size: 14px;
  padding: 7px 0;
  padding-left: 20px;
  margin-bottom: 12px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  border: 1px solid ${({ theme }) => theme.COLORS.BORDER};
  color: ${({ theme }) => theme.COLORS.TEXT};
`;

export const Containerx = styled(TextInput).attrs<TextInputProps>(({ theme }) => ({
  placeholderTextColor: theme.COLORS.SUBTEXT
})) <TextInputProps>`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 12px;
  font-size: 14px;
  padding: 7px 0;
  padding-left: 20px;
  margin-bottom: 12px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  border: 1px solid ${({ theme }) => theme.COLORS.BORDER};
  color: ${({ theme }) => theme.COLORS.TEXT};
`;


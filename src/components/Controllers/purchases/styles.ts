import styled from 'styled-components/native';

export const Container = styled.View`
  width: 45%;
  height: 200px;
  flex-direction: row;
  overflow: hidden;
  margin-bottom: 16px;
`;

export const Content = styled.View`
  flex: 1;
  height: 200px;
  padding: 0 15px;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 10px;
`;

export const Header = styled.View`
  flex-direction: row;
`;

export const Title = styled.Text`
  flex: 1;
  font-size: 18px;
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: ${({ theme }) => theme.COLORS.TEXT};
  margin-bottom: 120px;

`;


export const Info = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Footer = styled.View`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
`;


export const Label = styled.Text`
  font-size: 15px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.TEXT};
  margin-left: 3px;
`;

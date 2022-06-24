import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import theme  from '../../theme';
import styled from 'styled-components/native';

export const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

export const BackText = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: ${({ theme }) => theme.COLORS.PRIMARY};
  margin-left: 5px;
  `

export const ContentRow = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() 
  },
})`
  width: 50%;
  
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() 
  },
})`
  
  width: 100%;
`;

export const Options = styled.View`
  width: 90%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 50px;
  margin-left: 20px;
`;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    
  },
  profile: {
    width: '100%',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
    paddingBottom: getBottomSpace() + 20,
    paddingHorizontal: 44,
    marginBottom: 20
  },
  userdata: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.note,
    fontSize: 20,
    marginTop: 10,
    marginLeft: 23,
    marginBottom:-60,
  },
  title: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.note,
    fontSize: 20,
    marginTop: 10,
    marginLeft: 23,
    marginBottom:0,
  },
  email: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 7,
  },
  emailText: {
    fontFamily: theme.fonts.medium,
    color: theme.colors.secondary,
    marginLeft: 5,
    fontSize: 14,
  },
  about: {
    width: '100%',
    marginVertical: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: theme.fonts.regular,
    color: theme.colors.note,
    marginBottom: 7,
    fontSize: 14,
  },
  text: {
    fontFamily: theme.fonts.medium,
    color: theme.colors.text,
    fontSize: 18
  },
  locale: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  localeText: {
    fontFamily: theme.fonts.regular,
    color: theme.colors.note,
    marginLeft: 5,
    fontSize: 14,
  },
  info: {
    alignItems: 'center'
  },
  
}

);
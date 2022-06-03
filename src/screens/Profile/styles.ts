import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import theme  from '../../theme';

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
    marginBottom:-10,
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
  
});
import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import tema from '../../../theme/index';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: getStatusBarHeight() + 58,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: .3
  },
  welcome: {
    width: '100%',
  },
  title: {
    fontFamily: tema.fonts.bold,
    color: tema.colors.note,
    fontSize: 30,
    marginTop: -40,
    marginBottom: 10
  },
  subtitle: {
    fontFamily: tema.fonts.medium,
    color: tema.colors.note,
    fontSize: 18,
    marginTop: -7,
    marginBottom: -10
  },
});
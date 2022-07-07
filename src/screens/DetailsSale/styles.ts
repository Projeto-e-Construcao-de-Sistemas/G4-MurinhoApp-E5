import styled from 'styled-components/native';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { StyleSheet } from 'react-native';
import theme  from '../../theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  padding: ${getStatusBarHeight() + 24}px 24px ${getBottomSpace() + 14}px ;

`;


export const styles = StyleSheet.create({
    header: {
      paddingHorizontal: 20,
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    imageContainer: {
      flex: 0.45,
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    detailsContainer: {
      flex: 0.55,
      backgroundColor: theme.COLORS.LIGHT,
      marginHorizontal: 7,
      marginBottom: 7,
      borderRadius: 20,
      marginTop: 30,
      paddingTop: 30,
    },
    line: {
      width: 25,
      height: 2,
      backgroundColor: theme.COLORS.DARK,
      marginBottom: 5,
      marginRight: 3,
    },
    borderBtn: {
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      width: 60,
      height: 40,
    },
    borderBtnText: {fontWeight: 'bold', fontSize: 28},
    buyBtn: {
      width: 250,
      marginBottom:5,
      marginLeft:55,
      height: 50,
      backgroundColor: theme.COLORS.GREEN,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
    },
    priceTag: {
      backgroundColor: theme.COLORS.GREEN,
      width: 80,
      height: 40,
      justifyContent: 'center',
      borderTopLeftRadius: 25,
      borderBottomLeftRadius: 25,
    },
    TextInput: {
      height: 40,
      width: '100%',
      margin: 10,
      backgroundColor: 'white',
      borderColor: 'gray',
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 10,
    },
    backTitle: {
      fontFamily: theme.fonts.bold,
      color: theme.colors.note,
      fontSize: 15,
      marginTop: 10,
      marginLeft: 23,
      marginBottom:0,
    },
    title: {
      fontFamily: theme.fonts.bold,
      color: theme.colors.note,
      fontSize: 25,
      marginTop: '50%',
      marginLeft: '20%',
      marginBottom:0,
    },

    textt: {
      fontFamily: theme.fonts.medium,
      color: theme.colors.black,
      fontSize: 15,
      marginTop: 10,
      marginLeft: 23,
      marginBottom:0,
    },

  });

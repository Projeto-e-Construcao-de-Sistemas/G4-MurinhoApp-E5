import React, { useRef } from 'react';
import { BottomSheetView, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { useNavigation } from '@react-navigation/native';
import { Background } from './styles';
import { HomeTagProfileButton } from '@components/Controllers/HomeTagProfileButton';
import { OrderForm } from '@components/Forms/OrderForm';
import { Options } from './styles';


export function NewOrder() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  function handleSnapPress() {
    bottomSheetRef.current?.present();
  }

  const navigation = useNavigation();

  //OPTIONS ABAIXO PODE SER UM COMPONENTE (FOOTER GERAL)

  return (
    <>
      <Options> 
        <HomeTagProfileButton nome='home' title="Home" onPress={() => navigation.navigate('home')} />
        <HomeTagProfileButton nome='store-mall-directory' title="Tag" onPress={handleSnapPress} />
        <HomeTagProfileButton nome='person' title="Profile" onPress={() => navigation.navigate('optionsprofile')} />
      </Options>

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={['88%']}   //MUDAR AQUI PRA MAIOR SE NECESSÁRIO
          style={{ padding: 24 }}
          enablePanDownToClose={true}
          backdropComponent={() => <Background />}
        >
          <BottomSheetView>
            <OrderForm />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
}
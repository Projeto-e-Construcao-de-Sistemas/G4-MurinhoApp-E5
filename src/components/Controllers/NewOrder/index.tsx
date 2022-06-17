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
        <HomeTagProfileButton title="Home" onPress={() => navigation.navigate('home')} />
        <HomeTagProfileButton title="Tag" onPress={handleSnapPress} />
        <HomeTagProfileButton title="Profile" onPress={() => navigation.navigate('profile')} />
      </Options>

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={['82%']}   //MUDAR AQUI PRA MAIOR SE NECESSÁRIO
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
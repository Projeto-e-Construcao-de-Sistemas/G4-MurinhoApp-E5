import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn } from '@screens/SignIn';
import { Register } from '@screens/Register';
import { Profile } from '@screens/Profile';
import { Home } from "@screens/Home";

const { Navigator, Screen } = createNativeStackNavigator();

export function AlreadyAuthRoutes() {
  return (
      <>
      <Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
        <Screen name="profile" component={Profile}/>
        <Screen name="home" component={Home}/>
      </Navigator>
    </>
  );
}
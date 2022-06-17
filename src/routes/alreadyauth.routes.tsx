import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Profile } from '@screens/Profile';
import { UpdateProfile } from '@screens/UpdateProfile';
import { Home } from "@screens/Home";
import { SignIn } from '@screens/SignIn';
import { Details } from "@screens/Details";

const { Navigator, Screen } = createNativeStackNavigator();

export function AlreadyAuthRoutes() {
  return (
      <>
      <Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
        <Screen name="profile" component={Profile}/>
        <Screen name="home" component={Home}/>
        <Screen name="editprofile" component={UpdateProfile}/>
        <Screen name="details" component={Details}/>
      </Navigator>
    </>
  );
}
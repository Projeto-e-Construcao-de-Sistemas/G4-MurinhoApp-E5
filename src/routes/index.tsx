import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';

import { Home } from '@screens/Home';
import { AuthRoutes } from './auth.routes';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { AlreadyAuthRoutes } from "./alreadyauth.routes";

export function Routes() {

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(setUser);
    
    return subscriber;
  } ,[])

  return (
    <NavigationContainer>
      {user ? <AlreadyAuthRoutes/> : <AuthRoutes/>}
    </NavigationContainer>
  );
}

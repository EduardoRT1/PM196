import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './profile';
import Details from './details';

const Stack = createNativeStackNavigator();

export default function PerfilStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="Details" component={Details} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
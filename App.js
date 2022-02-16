import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MyContact from './screens/MyContact';
import Create from './screens/Create';
import ViewContact from './screens/ViewContact';
import UploadImage from './screens/UploadImage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MyContacts">
        <Stack.Screen
          name="MyContacts"
          component={MyContact}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Create"
          component={Create}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen name="ViewContact" component={ViewContact} />
        <Stack.Screen name="UploadImage" component={UploadImage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

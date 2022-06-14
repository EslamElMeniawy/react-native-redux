import React from 'react';
import {useColorScheme} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import type {RootStackParamList} from '../types/navigation';

import HomeScreen from '../screens/Home';
import MessageHooksScreen from '../screens/MessageHooks';
import MessageClassScreen from '../screens/MessageClass';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="MessageHooks"
        component={MessageHooksScreen}
        options={{title: 'Message Hooks'}}
      />
      <Stack.Screen
        name="MessageClass"
        component={MessageClassScreen}
        options={{title: 'Message Class'}}
        initialParams={{isDarkMode}}
      />
      <Stack.Screen
        name="UsersAsyncThunk"
        component={HomeScreen}
        options={{title: 'Users Async Thunk'}}
      />
      <Stack.Screen
        name="UsersRTKQuery"
        component={HomeScreen}
        options={{title: 'Users RTK Query'}}
      />
    </Stack.Navigator>
  );
};

import React from 'react';
import {useColorScheme} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import type {RootStackParamList} from '../types/navigation';

import HomeScreen from '../screens/Home';
import MessageHooksScreen from '../screens/MessageHooks';
import MessageClassScreen from '../screens/MessageClass';
import UsersAsyncThunkScreen from '../screens/UsersAsyncThunk';
import UsersRTKQueryScreen from '../screens/UsersRTKQuery';
import UserRTKQueryClassScreen from '../screens/UserRTKQueryClass';

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
        component={UsersAsyncThunkScreen}
        options={{title: 'Users Async Thunk'}}
      />
      <Stack.Screen
        name="UsersRTKQuery"
        component={UsersRTKQueryScreen}
        options={{title: 'Users RTK Query'}}
      />
      <Stack.Screen
        name="UserRTKQueryClass"
        component={UserRTKQueryClassScreen}
        options={{title: 'User RTK Query Class'}}
      />
    </Stack.Navigator>
  );
};

import React from 'react';
import {Button} from 'react-native';

import type {
  RootStackScreenProps,
  RootStackParamList,
} from '../types/navigation';

import ScreenContainer from '../components/ScreenContainer';
import Spacer from '../components/Spacer';

const HomeScreen = ({navigation}: RootStackScreenProps<'Home'>) => {
  const navigateToScreen = (screenName: keyof RootStackParamList) => {
    navigation.navigate(screenName);
  };

  return (
    <ScreenContainer>
      <Spacer />
      <Button
        title="Message Hooks"
        onPress={() => navigateToScreen('MessageHooks')}
      />
      <Spacer />
      <Button
        title="Message Class"
        onPress={() => navigateToScreen('MessageClass')}
      />
      <Spacer />
      <Button
        title="Users Async Thunk"
        onPress={() => navigateToScreen('UsersAsyncThunk')}
      />
      <Spacer />
      <Button
        title="Users RTK Query"
        onPress={() => navigateToScreen('UsersRTKQuery')}
      />
      <Spacer />
    </ScreenContainer>
  );
};

export default HomeScreen;

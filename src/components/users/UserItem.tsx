import React from 'react';
import {Pressable, Text, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from '@react-navigation/native';

import UserData from '../../types/api/UserData';

type Props = {
  user?: UserData | undefined;
};

export default (props: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();

  const textColorStyle = {
    color: isDarkMode ? Colors.light : Colors.dark,
  };

  const {user} = props;

  const openUserDetails = () => {
    navigation.navigate('UserRTKQueryClass', {isDarkMode, user});
  };

  return (
    <Pressable onPress={openUserDetails}>
      <Text style={textColorStyle}>
        {user?.first_name} {user?.last_name}
      </Text>
      <Text style={textColorStyle}>{user?.email}</Text>
    </Pressable>
  );
};

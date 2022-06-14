import React from 'react';
import {View, Text, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import UserData from '../../types/api/UserData';

type Props = {
  user?: UserData | undefined;
};

export default (props: Props) => {
  const isDarkMode = useColorScheme() === 'dark';

  const textColorStyle = {
    color: isDarkMode ? Colors.light : Colors.dark,
  };

  const {user} = props;

  return (
    <View>
      <Text style={textColorStyle}>
        {user?.first_name} {user?.last_name}
      </Text>
      <Text style={textColorStyle}>{user?.email}</Text>
    </View>
  );
};

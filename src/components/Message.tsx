import React from 'react';
import {View, Text, Button, StyleSheet, useColorScheme} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {RootState} from '../store';
import {setMessage} from '../store/message';

const Message = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const {message} = useSelector((state: RootState) => state.message);

  const handlePress = () => {
    dispatch(setMessage('Message from Component'));
  };

  const containerBackgroundStyle = {
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };

  const textColorStyle = {
    color: isDarkMode ? Colors.light : Colors.dark,
  };

  return (
    <View style={[styles.container, containerBackgroundStyle]}>
      <Text style={textColorStyle}>{message}</Text>
      <Button title={'Set Message'} onPress={handlePress} />
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    padding: 8,
  },
});

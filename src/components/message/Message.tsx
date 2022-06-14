import React from 'react';
import {Text, Button, StyleSheet, useColorScheme} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {RootState} from '../../store';
import {setMessage} from '../../store/message';

import Spacer from '../Spacer';

const Message = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const {message} = useSelector((state: RootState) => state.message);

  const handlePress = () => {
    dispatch(setMessage('Message from Hooks Component'));
  };

  const textColorStyle = {
    color: isDarkMode ? Colors.light : Colors.dark,
  };

  return (
    <>
      <Text style={[styles.text, textColorStyle]}>{message}</Text>
      <Spacer />
      <Button title="Set Message" onPress={handlePress} />
    </>
  );
};

export default Message;

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});

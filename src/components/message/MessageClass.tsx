import React from 'react';
import {Text, Button, StyleSheet} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {RootState} from '../../store';
import {setMessage} from '../../store/message';

import Spacer from '../Spacer';

type MessageClassProps = ConnectedProps<typeof connector>;

class MessageClass extends React.PureComponent<MessageClassProps> {
  handlePress = () => {
    const {dispatch} = this.props;
    dispatch(setMessage('Message from Class Component'));
  };

  render() {
    const {message, isDarkMode} = this.props;

    const textColorStyle = {
      color: isDarkMode ? Colors.light : Colors.dark,
    };

    return (
      <>
        <Text style={[styles.text, textColorStyle]}>{message}</Text>
        <Spacer />
        <Button title="Set Message" onPress={this.handlePress} />
      </>
    );
  }
}

const mapStateToProps = (state: RootState, props: {isDarkMode: boolean}) => ({
  ...props,
  message: state.message.message,
});

const connector = connect(mapStateToProps);

export default connector(MessageClass);

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});

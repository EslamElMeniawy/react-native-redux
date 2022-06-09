import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {RootState, AppDispatch} from '../store';
import {setMessage} from '../store/message';

interface MyComponentProps {
  dispatch: AppDispatch;
  message: string;
  isDarkMode: boolean;
}

class MessageClass extends React.PureComponent<MyComponentProps> {
  handlePress = () => {
    const {dispatch} = this.props;
    dispatch(setMessage('Message from Class Component'));
  };

  render() {
    const {message, isDarkMode} = this.props;

    const containerBackgroundStyle = {
      backgroundColor: isDarkMode ? Colors.black : Colors.white,
    };

    const textColorStyle = {
      color: isDarkMode ? Colors.light : Colors.dark,
    };

    return (
      <View style={[styles.container, containerBackgroundStyle]}>
        <Text style={textColorStyle}>{message}</Text>
        <Button title={'Set Message'} onPress={this.handlePress} />
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  message: state.message.message,
});

export default connect(mapStateToProps)(MessageClass);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

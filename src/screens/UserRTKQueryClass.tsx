import React from 'react';
import {StyleSheet, Text, ActivityIndicator, View, Image} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import type {RootStackScreenProps} from '../types/navigation';

import {RootState} from '../store';
import {usersApi as api} from '../store/api/usersApi';

import ScreenContainer from '../components/ScreenContainer';
import Spacer from '../components/Spacer';

type UserRTKQueryClassScreenProps = ConnectedProps<typeof connector>;

class UserRTKQueryClassScreen extends React.PureComponent<UserRTKQueryClassScreenProps> {
  getUserUnsubscribe: null | (() => void) = null;

  componentDidMount() {
    this.loadUserData();
  }

  componentWillUnmount() {
    // Unsubscribe the component from the cached data when unmounting.
    this.getUserUnsubscribe?.();
  }

  loadUserData = () => {
    const {getUser, route} = this.props;
    const {user} = route.params;

    // Start a subscription for the component to the cached data.
    const {unsubscribe} = getUser(user);

    // Store the unsubscribe promise for later use.
    this.getUserUnsubscribe = unsubscribe;
  };

  getContent = () => {
    const {userDispatch, route} = this.props;
    const {data: user, isLoading, isSuccess, isError, error} = userDispatch;
    const {isDarkMode} = route.params;

    const textColorStyle = {
      color: isDarkMode ? Colors.light : Colors.dark,
    };

    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }

    if (isError) {
      return <Text style={[styles.error, textColorStyle]}>{error}</Text>;
    }

    if (isSuccess) {
      if (!user) {
        return (
          <Text style={[styles.error, textColorStyle]}>
            User Not Available!
          </Text>
        );
      }

      return (
        <View style={styles.userContainer}>
          {Boolean(user?.avatar) && (
            <>
              <Image source={{uri: user?.avatar}} style={styles.userImage} />
              <Spacer />
            </>
          )}

          <Text style={textColorStyle}>
            {user?.first_name} {user?.last_name}
          </Text>
          <Text style={textColorStyle}>{user?.email}</Text>
        </View>
      );
    }
  };

  render() {
    return <ScreenContainer>{this.getContent()}</ScreenContainer>;
  }
}

const mapStateToProps = (
  state: RootState,
  props: RootStackScreenProps<'UserRTKQueryClass'>,
) => {
  const {route} = props;
  const user = route?.params?.user;

  return {
    ...props,
    userDispatch: api.endpoints.getUser.select(user)(state),
  };
};

const mapDispatchToProps = {
  getUser: api.endpoints.getUser.initiate,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(UserRTKQueryClassScreen);

const styles = StyleSheet.create({
  error: {
    textAlign: 'center',
  },
  userContainer: {
    alignItems: 'center',
  },
  userImage: {
    width: 100,
    height: 100,
  },
});

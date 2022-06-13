import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Button,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {getUsers} from '../store/api/usersApi';

const UsersRtkApi = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const getUsersParams: Record<string, any> = {delay: 1};

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = getUsers({params: getUsersParams});

  const containerBackgroundStyle = {
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };

  const textColorStyle = {
    color: isDarkMode ? Colors.light : Colors.dark,
  };

  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (isError) {
    return <Text style={textColorStyle}>{error}</Text>;
  }

  if (isSuccess) {
    return (
      <View style={[styles.container, containerBackgroundStyle]}>
        <View style={styles.reloadButtonContainer}>
          <Button title={'Reload'} onPress={refetch} />
        </View>

        {users.map(user => {
          return (
            <View style={styles.userContainer} key={user.id}>
              <View>
                <Text style={textColorStyle}>
                  {user.first_name} {user.last_name}
                </Text>
                <Text style={textColorStyle}>{user.email}</Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  }

  return null;
};

export default UsersRtkApi;

const styles = StyleSheet.create({
  loader: {
    marginVertical: 8,
  },
  container: {
    marginVertical: 8,
    padding: 8,
  },
  reloadButtonContainer: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 8,
  },
  userContainer: {
    marginVertical: 8,
  },
});

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

import {getUsers} from '../../store/api/usersApi';

import Spacer from '../Spacer';

const UsersRtkApi = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [page, setPage] = React.useState(1);
  const getUsersParams: Record<string, any> = {delay: 1, page};

  const {
    data: usersResponse,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
  } = getUsers({params: getUsersParams});

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
    if (!usersResponse?.data) {
      return (
        <Text style={[styles.error, textColorStyle]}>No Users Available!</Text>
      );
    }

    return (
      <>
        <Button title="Reload" onPress={refetch} />

        {usersResponse?.data?.map(user => {
          return (
            <React.Fragment key={user.id}>
              <Spacer />
              <View>
                <Text style={textColorStyle}>
                  {user.first_name} {user.last_name}
                </Text>
                <Text style={textColorStyle}>{user.email}</Text>
              </View>
            </React.Fragment>
          );
        })}

        <Spacer />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <Button
              title="Previous"
              onPress={() => setPage(prev => prev - 1)}
              disabled={page === 1 || isFetching || isLoading}
            />
          </View>
          {isFetching && (
            <ActivityIndicator size="small" style={styles.buttonContainer} />
          )}
          {!isFetching && (
            <Text
              style={[styles.pageText, textColorStyle]}>{`Page ${page}`}</Text>
          )}
          <View style={styles.buttonContainer}>
            <Button
              title="Next"
              onPress={() => setPage(prev => prev + 1)}
              disabled={
                page === usersResponse.total_pages || isFetching || isLoading
              }
            />
          </View>
        </View>
      </>
    );
  }

  return null;
};

export default UsersRtkApi;

const styles = StyleSheet.create({
  error: {
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
  },
  pageText: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },
});

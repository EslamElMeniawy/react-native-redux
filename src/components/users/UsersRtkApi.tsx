import React from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  Button,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {getUsers} from '../../store/api/usersApi';

import Spacer from '../Spacer';
import UserItem from './UserItem';
import UsersPagination from './UsersPagination';

const UsersRtkApi = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [page, setPage] = React.useState(1);
  const getUsersParams: Record<string, any> = {delay: 1, page};

  const {
    data: usersResponse,
    isLoading,
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
              <UserItem user={user} />
            </React.Fragment>
          );
        })}

        <Spacer />
        <UsersPagination page={page} setPage={setPage} />
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
});

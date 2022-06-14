import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Button,
  useColorScheme,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {RootState, AppDispatch} from '../../store';
import {fetchUsers, selectAllUsers} from '../../store/users';

function Users(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch<AppDispatch>();
  const {loading} = useSelector((state: RootState) => state.users);
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const containerBackgroundStyle = {
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };

  const textColorStyle = {
    color: isDarkMode ? Colors.light : Colors.dark,
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={[styles.container, containerBackgroundStyle]}>
      <View style={styles.reloadButtonContainer}>
        <Button title={'Reload'} onPress={() => dispatch(fetchUsers())} />
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

export default Users;

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

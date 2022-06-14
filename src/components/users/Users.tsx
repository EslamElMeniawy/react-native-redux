import React, {useEffect} from 'react';
import {
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

import Spacer from '../Spacer';

function Users(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch<AppDispatch>();
  const {loading} = useSelector((state: RootState) => state.users);
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const textColorStyle = {
    color: isDarkMode ? Colors.light : Colors.dark,
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <>
      <Button title={'Reload'} onPress={() => dispatch(fetchUsers())} />

      {users.map(user => {
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
    </>
  );
}

export default Users;

import React, {useEffect} from 'react';
import {ActivityIndicator, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {RootState, AppDispatch} from '../../store';
import {fetchUsers, selectAllUsers} from '../../store/users';

import Spacer from '../Spacer';
import UserItem from './UserItem';

function Users(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const {loading} = useSelector((state: RootState) => state.users);
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

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
            <UserItem user={user} />
          </React.Fragment>
        );
      })}
    </>
  );
}

export default Users;

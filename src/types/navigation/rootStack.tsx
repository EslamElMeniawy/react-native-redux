import {NativeStackScreenProps} from '@react-navigation/native-stack';

import UserData from '../api/UserData';

type RootStackParamList = {
  Home: undefined;
  MessageHooks: undefined;
  MessageClass: {isDarkMode: boolean};
  UsersAsyncThunk: undefined;
  UsersRTKQuery: undefined;
  UserRTKQueryClass: {isDarkMode: boolean; user?: UserData | undefined};
};

type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type {RootStackParamList, RootStackScreenProps};

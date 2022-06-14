import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  MessageHooks: undefined;
  MessageClass: {isDarkMode: boolean};
  UsersAsyncThunk: undefined;
  UsersRTKQuery: undefined;
};

type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type {RootStackParamList, RootStackScreenProps};

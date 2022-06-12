import {api} from './rtkApi';
import UserData from '../../types/UserData';
import UserRequest from '../../types/UserRequest';

export const usersApi = api.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<UserData[], UserRequest>({
      providesTags: ['Users'],
      query: userRequest => ({
        url: '/users',
        method: 'GET',
        params: userRequest.params,
      }),
      transformResponse: (response: any) => response.data,
    }),
    getUser: builder.query<UserData, UserData>({
      query: user => `/users/${user.id}`,
      transformResponse: (response: any) => response.data,
    }),
    addUser: builder.mutation<UserData, UserRequest>({
      invalidatesTags: ['Users'],
      query: userRequest => ({
        url: '/users',
        method: 'POST',
        body: userRequest.body,
      }),
    }),
    updateUser: builder.mutation<UserData, UserRequest>({
      invalidatesTags: ['Users'],
      query: userRequest => ({
        url: '/users',
        method: 'PUT',
        body: userRequest.body,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery: getUsers,
  useGetUserQuery: getUser,
  useAddUserMutation: addUser,
  useUpdateUserMutation: updateUser,
} = usersApi;

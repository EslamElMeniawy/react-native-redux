import {api} from './rtkApi';
import UserData from '../../types/api/UserData';
import ApiRequest from '../../types/api/ApiRequest';
import PagingResponse from '../../types/api/PagingResponse';

export const usersApi = api.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<PagingResponse<UserData>, ApiRequest | void>({
      providesTags: result =>
        result && result?.data
          ? [
              // Provides a tag for each user in the current page,
              // as well as the 'PARTIAL-LIST' tag.
              ...result.data.map(({id}) => ({type: 'Users' as const, id})),
              {type: 'Users', id: 'PARTIAL-LIST'},
            ]
          : [{type: 'Users', id: 'PARTIAL-LIST'}],
      query: apiRequest => ({
        url: '/users',
        method: 'GET',
        params: apiRequest?.params,
      }),
    }),
    getUser: builder.query<UserData, UserData | void>({
      query: user => `/users/${user?.id}?delay=1`,
      transformResponse: (response: any) => response.data,
    }),
    addUser: builder.mutation<UserData, ApiRequest>({
      // Invalidates the tag for this User `id`, as well as the `PARTIAL-LIST` tag,
      // causing the `getUsers` query to re-fetch if a component is subscribed to the query.
      invalidatesTags: result => [
        {type: 'Users', id: result?.id},
        {type: 'Users', id: 'PARTIAL-LIST'},
      ],
      query: apiRequest => ({
        url: '/users',
        method: 'POST',
        body: apiRequest.body,
      }),
    }),
    updateUser: builder.mutation<UserData, ApiRequest>({
      // Invalidates the tag for this User `id`, as well as the `PARTIAL-LIST` tag,
      // causing the `getUsers` query to re-fetch if a component is subscribed to the query.
      invalidatesTags: result => [
        {type: 'Users', id: result?.id},
        {type: 'Users', id: 'PARTIAL-LIST'},
      ],
      query: apiRequest => ({
        url: '/users',
        method: 'PUT',
        body: apiRequest.body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUsersQuery: getUsers,
  useGetUserQuery: getUser,
  useAddUserMutation: addUser,
  useUpdateUserMutation: updateUser,
} = usersApi;

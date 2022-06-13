import {api} from './rtkApi';
import UserData from '../../types/UserData';
import ApiRequest from '../../types/ApiRequest';
import PagingResponse from '../../types/PagingResponse';

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
      async onQueryStarted(_arg, {queryFulfilled}) {
        queryFulfilled.then(result => {
          console.info('result', result);
        });
      },
    }),
    getUser: builder.query<UserData, UserData>({
      query: user => `/users/${user.id}`,
      transformResponse: (response: any) => response.data,
    }),
    addUser: builder.mutation<UserData, ApiRequest>({
      // Invalidates the tag for this User `id`, as well as the `PARTIAL-LIST` tag,
      // causing the `getUsers` query to re-fetch if a component is subscribed to the query.
      invalidatesTags: (_result, _error, id) => [
        {type: 'Users', id},
        {type: 'Users', id: 'PARTIAL-LIST'},
      ],
      // invalidatesTags: ['Users'],
      query: apiRequest => ({
        url: '/users',
        method: 'POST',
        body: apiRequest.body,
      }),
    }),
    updateUser: builder.mutation<UserData, ApiRequest>({
      invalidatesTags: ['Users'],
      query: apiRequest => ({
        url: '/users',
        method: 'PUT',
        body: apiRequest.body,
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

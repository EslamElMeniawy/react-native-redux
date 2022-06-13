import {configureStore} from '@reduxjs/toolkit';

import messageReducer from './message';
import usersReducer from './users';
import {api} from './api/rtkApi';

export const store = configureStore({
  reducer: {
    message: messageReducer,
    users: usersReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

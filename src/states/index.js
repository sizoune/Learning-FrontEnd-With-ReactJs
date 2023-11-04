import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer.js';
import isPreloadReducer from './isPreload/reducer.js';
import usersReducer from './users/reducer.js';
import isLoadingReducer from './isLoading/reducer.js';
import isErrorReducer from './isError/reducer.js';
import isSuccessReducer from './isSuccess/reducer.js';
import threadsReducer from './threads/reducer.js';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    isLoading: isLoadingReducer,
    error: isErrorReducer,
    success: isSuccessReducer,
    threads: threadsReducer,
  },
});

export default store;

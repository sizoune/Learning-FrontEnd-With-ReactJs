import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { startLoadingActionCreator, stopLoadingActionCreator } from '../isLoading/action.js';
import { showErrorActionCreator } from '../isError/action.js';
import { receiveUsersActionCreator } from '../users/action.js';
import { receiveThreadsActionCreator } from '../threads/action.js';
import api from '../../utils/api.js';

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(startLoadingActionCreator());
    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      dispatch(showErrorActionCreator(error.message));
    }
    dispatch(stopLoadingActionCreator());
    dispatch(hideLoading());
  };
}

export default asyncPopulateUsersAndThreads;

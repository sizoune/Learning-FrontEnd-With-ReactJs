import { startLoadingActionCreator, stopLoadingActionCreator } from '../isLoading/action.js';
import { showErrorActionCreator } from '../isError/action.js';
import { receiveUsersActionCreator } from '../users/action.js';
import { receiveThreadsActionCreator } from '../threads/action.js';
import api from '../../utils/api.js';

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
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
  };
}

function asyncUpVote(threadId) {
  return async (dispatch, getState) => {
    dispatch(startLoadingActionCreator());
    const { authUser } = getState();

    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleLikeTalkActionCreator({ talkId, userId: authUser.id }));
    }
    dispatch(hideLoading());
  };
}

export default asyncPopulateUsersAndThreads;

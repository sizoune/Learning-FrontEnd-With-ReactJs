import { startLoadingActionCreator, stopLoadingActionCreator } from '../isLoading/action.js';
import api from '../../utils/api.js';
import { showErrorActionCreator } from '../isError/action.js';
import { showSuccessActionCreator } from '../isSuccess/action.js';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  FILTER_THREAD: 'FILTER_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

// function toggleVoteThreadActionCreator({ threadId, userId }) {
//   return {
//     type: ActionType.TOGGLE_VOTE_THREAD,
//     payload: {
//       threadId,
//       userId,
//     },
//   };
// }

function asyncAddThread({ title, body, category = 'General' }) {
  return async (dispatch) => {
    dispatch(startLoadingActionCreator());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
      dispatch(showSuccessActionCreator('Thread Berhasil ditambahkan!'));
    } catch (error) {
      dispatch(showErrorActionCreator(error.message));
    }
    dispatch(stopLoadingActionCreator());
  };
}

// function asyncToogleVoteThread(threadId) {
//   return async (dispatch, getState) => {
//     dispatch(startLoadingActionCreator());
//     const { authUser } = getState();
//     dispatch(toggleLikeTalkActionCreator({ threadId, userId: authUser.id }));
//
//     try {
//       await api.toggleLikeTalk(threadId);
//     } catch (error) {
//       alert(error.message);
//       dispatch(toggleLikeTalkActionCreator({ threadId, userId: authUser.id }));
//     }
//     dispatch(stopLoadingActionCreator());
//   };
// }

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  asyncAddThread,
};

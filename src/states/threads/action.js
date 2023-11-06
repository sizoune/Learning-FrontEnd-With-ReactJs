import { startLoadingActionCreator, stopLoadingActionCreator } from '../isLoading/action.js';
import api from '../../utils/api.js';
import { showErrorActionCreator } from '../isError/action.js';
import { showSuccessActionCreator } from '../isSuccess/action.js';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_UP_VOTE_THREAD: 'TOGGLE_UP_VOTE_THREAD',
  TOGGLE_DOWN_VOTE_THREAD: 'TOGGLE_DOWN_VOTE_THREAD',
  TOGGLE_NEUTRALIZE_VOTE_THREAD: 'TOGGLE_NEUTRALIZE_VOTE_THREAD',
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

function toggleUpVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleDownVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

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

function asyncToggleUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    // dispatch(startLoadingActionCreator());
    const { authUser } = getState();
    dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      dispatch(showErrorActionCreator(error.message));
      dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }
    // dispatch(stopLoadingActionCreator());
  };
}

function asyncToggleDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      dispatch(showErrorActionCreator(error.message));
      dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

function asyncToggleNeutralizedVoteThread(threadId, voteType) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (voteType === 'upvote') {
      dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
    } else {
      dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }

    try {
      await api.neutralizeVoteThread(threadId);
    } catch (error) {
      dispatch(showErrorActionCreator(error.message));
      if (voteType === 'upvote') {
        dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
      } else {
        dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));
      }
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  asyncAddThread,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
  asyncToggleNeutralizedVoteThread,
};

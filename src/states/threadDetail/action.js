import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { startLoadingActionCreator, stopLoadingActionCreator } from '../isLoading/action.js';
import api from '../../utils/api.js';
import { showErrorActionCreator } from '../isError/action.js';
import { receiveCommentsActionCreator } from '../comments/action.js';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  TOGGLE_UP_VOTE_THREAD_DETAIL: 'TOGGLE_UP_VOTE_THREAD_DETAIL',
  TOGGLE_DOWN_VOTE_THREAD_DETAIL: 'TOGGLE_DOWN_VOTE_THREAD_DETAIL',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function toggleUpVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function toggleDownVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    dispatch(startLoadingActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      const { comments } = threadDetail;
      dispatch(receiveThreadDetailActionCreator(threadDetail));
      dispatch(receiveCommentsActionCreator(comments));
    } catch (error) {
      dispatch(showErrorActionCreator(error.message));
    }
    dispatch(stopLoadingActionCreator());
    dispatch(hideLoading());
  };
}

function asyncToggleUpVoteThreadDetail(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    dispatch(toggleUpVoteThreadDetailActionCreator(authUser.id));

    try {
      await api.upVoteComment({ threadId: threadDetail.id, commentId });
    } catch (error) {
      dispatch(showErrorActionCreator(error.message));
      dispatch(toggleUpVoteThreadDetailActionCreator(authUser.id));
    }
    dispatch(hideLoading());
  };
}

function asyncToggleDownVoteThreadDetail(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    dispatch(toggleDownVoteThreadDetailActionCreator(authUser.id));

    try {
      await api.downVoteComment({ threadId: threadDetail.id, commentId });
    } catch (error) {
      dispatch(showErrorActionCreator(error.message));
      dispatch(toggleDownVoteThreadDetailActionCreator(authUser.id));
    }
    dispatch(hideLoading());
  };
}

function asyncToggleNeutralizedVoteThreadDetail(commentId, voteType) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    if (voteType === 'upvote') {
      dispatch(toggleUpVoteThreadDetailActionCreator(authUser.id));
    } else {
      dispatch(toggleDownVoteThreadDetailActionCreator(authUser.id));
    }

    try {
      await api.neutralizeVoteComment({ threadId: threadDetail.id, commentId });
    } catch (error) {
      dispatch(showErrorActionCreator(error.message));
      if (voteType === 'upvote') {
        dispatch(toggleUpVoteThreadDetailActionCreator(authUser.id));
      } else {
        dispatch(toggleDownVoteThreadDetailActionCreator(authUser.id));
      }
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  toggleUpVoteThreadDetailActionCreator,
  toggleDownVoteThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncToggleNeutralizedVoteThreadDetail,
};

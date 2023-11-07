import { startLoadingActionCreator, stopLoadingActionCreator } from '../isLoading/action.js';
import api from '../../utils/api.js';
import { showSuccessActionCreator } from '../isSuccess/action.js';
import { showErrorActionCreator } from '../isError/action.js';

const ActionType = {
  RECEIVE_COMMENTS: 'RECEIVE_COMMENTS',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_UP_VOTE_COMMENT: 'TOGGLE_UP_VOTE_COMMENT',
  TOGGLE_DOWN_VOTE_COMMENT: 'TOGGLE_DOWN_VOTE_COMMENT',
};

function receiveCommentsActionCreator(comments) {
  return {
    type: ActionType.RECEIVE_COMMENTS,
    payload: {
      comments,
    },
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function toggleUpVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function toggleDownVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncAddComment({ content }) {
  return async (dispatch, getState) => {
    dispatch(startLoadingActionCreator());
    const { threadDetail } = getState();
    try {
      const comment = await api.createComment({ threadId: threadDetail.id, content });
      dispatch(addCommentActionCreator(comment));
      dispatch(showSuccessActionCreator('Comment Berhasil ditambahkan!'));
    } catch (error) {
      dispatch(showErrorActionCreator(error.message));
    }
    dispatch(stopLoadingActionCreator());
  };
}

function asyncToggleUpVoteComment(commentId) {
  return async (dispatch, getState) => {
    // dispatch(startLoadingActionCreator());
    const { authUser, threadDetail } = getState();
    dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      await api.upVoteComment({ threadId: threadDetail.id, commentId });
    } catch (error) {
      dispatch(showErrorActionCreator(error.message));
      dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
    // dispatch(stopLoadingActionCreator());
  };
}

function asyncToggleDownVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      await api.downVoteComment({ threadId: threadDetail.id, commentId });
    } catch (error) {
      dispatch(showErrorActionCreator(error.message));
      dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
  };
}

function asyncToggleNeutralizedVoteComment(commentId, voteType) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (voteType === 'upvote') {
      dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));
    } else {
      dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }

    try {
      await api.neutralizeVoteComment({ threadId: threadDetail.id, commentId });
    } catch (error) {
      dispatch(showErrorActionCreator(error.message));
      if (voteType === 'upvote') {
        dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));
      } else {
        dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));
      }
    }
  };
}

export {
  ActionType,
  receiveCommentsActionCreator,
  addCommentActionCreator,
  asyncAddComment,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
  asyncToggleNeutralizedVoteComment,
};

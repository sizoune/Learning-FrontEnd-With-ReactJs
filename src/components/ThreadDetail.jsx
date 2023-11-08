import React from 'react';
import parse from 'html-react-parser';
import PropTypes, { string } from 'prop-types';
import {
  BiDislike, BiLike, BiSolidDislike, BiSolidLike,
} from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { postedAt } from '../utils/helper.js';
import ThreadDetailComment from './ThreadDetailComment.jsx';
import { asyncAddComment } from '../states/comments/action.js';
import CommentList from './CommentList.jsx';
import { userShape } from './ThreadItem.jsx';
import {
  asyncToggleDownVoteThreadDetail,
  asyncToggleNeutralizedVoteThreadDetail,
  asyncToggleUpVoteThreadDetail,
} from '../states/threadDetail/action.js';

function ThreadDetail({
  title,
  body,
  category,
  ownerName,
  ownerAvatar,
  upVotesBy,
  downVotesBy,
  authUser,
  createdAt,
}) {
  const isLoading = useSelector((state) => state.isLoading);
  const comments = useSelector((state) => state.comments);

  const dispatch = useDispatch();

  const onDownVoteClick = (event) => {
    event.stopPropagation();
    dispatch(asyncToggleDownVoteThreadDetail());
  };
  const onUpVoteClick = (event) => {
    event.stopPropagation();
    dispatch(asyncToggleUpVoteThreadDetail());
  };
  const onNeutralizedEvent = (event, voteType) => {
    event.stopPropagation();
    dispatch(asyncToggleNeutralizedVoteThreadDetail(voteType));
  };

  const onAddThreadComment = ({ content }) => {
    dispatch(asyncAddComment({ content }));
  };

  const threadComments = comments.map((comment) => ({
    ...comment,
    authUser: authUser.id,
  }));

  return (
    <div className="container mx-auto lg:max-w-2xl sm:max-w-sm">
      <div className="flex flex-wrap">
        <p className="mb-2 px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
          #
          {category}
        </p>
      </div>
      <h5 className="mt-5 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>

      <div className="mt-4">
        <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">{parse(body)}</div>
      </div>
      <div className="flex items-center gap-4 mt-3.5 mb-5">
        <button type="button" onClick={upVotesBy.includes(authUser.id) ? (event) => onNeutralizedEvent(event, 'upvote') : onUpVoteClick} className="flex items-center gap-1">
          {upVotesBy.includes(authUser.id) ? <BiSolidLike /> : <BiLike />}
          {upVotesBy.length}
        </button>
        <button type="button" onClick={downVotesBy.includes(authUser.id) ? (event) => onNeutralizedEvent(event, 'downvote') : onDownVoteClick} className="flex items-center gap-1">
          {downVotesBy.includes(authUser.id) ? <BiSolidDislike /> : <BiDislike />}
          {downVotesBy.length}
        </button>
        <div className="flex items-center gap-1">
          <span>Dibuat oleh</span>
          <img className="w-8 h-8 rounded-full shadow-lg" src={ownerAvatar} alt="" />
          <span>{ownerName}</span>
        </div>
        <p>{postedAt(createdAt)}</p>
      </div>
      <ThreadDetailComment isLoading={isLoading} onSubmit={onAddThreadComment} />
      <CommentList comments={threadComments} />
    </div>
  );
}

ThreadDetail.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  ownerAvatar: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(string).isRequired,
  downVotesBy: PropTypes.arrayOf(string).isRequired,
  authUser: PropTypes.shape(userShape).isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default ThreadDetail;

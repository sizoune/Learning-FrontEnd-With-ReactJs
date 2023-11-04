import React from 'react';
import {
  BiDislike, BiLike, BiSolidDislike, BiSolidLike,
} from 'react-icons/bi';
import { AiOutlineComment } from 'react-icons/ai';
import PropTypes, { string } from 'prop-types';
import { postedAt } from '../utils/helper.js';

function ThreadItemFooter({
  threadId, onUpVote, onDownVote, upVotesBy, downVotesBy, authUser, createdAt, totalComments,
}) {
  const onDownVoteClick = (event) => {
    event.stopPropagation();
    onDownVote(threadId);
  };
  const onUpVoteClick = (event) => {
    event.stopPropagation();
    onUpVote(threadId);
  };

  return (
    <div className="flex items-center gap-4 mt-3.5">
      <button type="button" onClick={onUpVoteClick} className="flex items-center gap-1">
        {upVotesBy.includes(authUser) ? <BiSolidLike /> : <BiLike />}
        {upVotesBy.length}
      </button>
      <button type="button" onClick={onDownVoteClick} className="flex items-center gap-1">
        {downVotesBy.includes(authUser) ? <BiSolidDislike /> : <BiDislike />}
        {downVotesBy.length}
      </button>
      <p className="flex items-center gap-1">
        <AiOutlineComment />
        {' '}
        {totalComments}
      </p>
      <p>{postedAt(createdAt)}</p>
    </div>
  );
}

ThreadItemFooter.propTypes = {
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  upVotesBy: PropTypes.arrayOf(string).isRequired,
  downVotesBy: PropTypes.arrayOf(string).isRequired,
  authUser: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  threadId: PropTypes.string.isRequired,
};

export default ThreadItemFooter;

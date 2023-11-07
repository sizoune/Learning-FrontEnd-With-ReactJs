import {
  BiDislike, BiLike, BiSolidDislike, BiSolidLike,
} from 'react-icons/bi';
import { AiOutlineComment } from 'react-icons/ai';
import PropTypes, { string } from 'prop-types';
import { useDispatch } from 'react-redux';
import { postedAt } from '../utils/helper.js';
import {
  asyncToggleDownVoteThread,
  asyncToggleNeutralizedVoteThread,
  asyncToggleUpVoteThread,
} from '../states/threads/action.js';

function ThreadItemFooter({
  threadId, upVotesBy, downVotesBy, authUser, createdAt, totalComments,
}) {
  const dispatch = useDispatch();

  const onDownVoteClick = (event) => {
    event.stopPropagation();
    dispatch(asyncToggleDownVoteThread(threadId));
  };
  const onUpVoteClick = (event) => {
    event.stopPropagation();
    dispatch(asyncToggleUpVoteThread(threadId));
  };
  const onNeutralizedEvent = (event, voteType) => {
    event.stopPropagation();
    dispatch(asyncToggleNeutralizedVoteThread(threadId, voteType));
  };

  return (
    <div className="flex items-center gap-4 mt-3.5">
      <button type="button" onClick={upVotesBy.includes(authUser) ? (event) => onNeutralizedEvent(event, 'upvote') : onUpVoteClick} className="flex items-center gap-1">
        {upVotesBy.includes(authUser) ? <BiSolidLike /> : <BiLike />}
        {upVotesBy.length}
      </button>
      <button type="button" onClick={downVotesBy.includes(authUser) ? (event) => onNeutralizedEvent(event, 'downvote') : onDownVoteClick} className="flex items-center gap-1">
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
  upVotesBy: PropTypes.arrayOf(string).isRequired,
  downVotesBy: PropTypes.arrayOf(string).isRequired,
  authUser: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  threadId: PropTypes.string.isRequired,
};

export default ThreadItemFooter;

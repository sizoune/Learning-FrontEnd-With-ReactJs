import {
  BiDislike, BiLike, BiSolidDislike, BiSolidLike,
} from 'react-icons/bi';
import PropTypes, { string } from 'prop-types';
import { useDispatch } from 'react-redux';
import parse from 'html-react-parser';
import { postedAt } from '../utils/helper.js';
import {
  asyncToggleDownVoteComment,
  asyncToggleNeutralizedVoteComment,
  asyncToggleUpVoteComment,
} from '../states/comments/action.js';

function CommentItem({
  commentId, avatar, name, createdAt, content, upVotesBy, downVotesBy, authUser,
}) {
  const commentDispatch = useDispatch();

  const onDownVoteClick = (event) => {
    event.stopPropagation();
    commentDispatch(asyncToggleDownVoteComment(commentId));
  };
  const onUpVoteClick = (event) => {
    event.stopPropagation();
    commentDispatch(asyncToggleUpVoteComment(commentId));
  };
  const onNeutralizedEvent = (event, voteType) => {
    event.stopPropagation();
    commentDispatch(asyncToggleNeutralizedVoteComment(commentId, voteType));
  };

  return (
    <div className="mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 min-w-full">
      <div className="flex items-center mb-5">
        <div className="flex flex-1 items-center gap-2">
          <img className="w-6 h-6 rounded-full shadow-lg" src={avatar} alt="comment avatar" />
          <p>{name}</p>
        </div>
        <p>{postedAt(createdAt)}</p>
      </div>
      <p>{parse(content)}</p>
      <div className="flex items-center gap-2 mt-3.5">
        <button type="button" onClick={upVotesBy.includes(authUser) ? (event) => onNeutralizedEvent(event, 'upvote') : onUpVoteClick} className="flex items-center gap-1">
          {upVotesBy.includes(authUser) ? <BiSolidLike /> : <BiLike />}
          {upVotesBy.length}
        </button>
        <button type="button" onClick={downVotesBy.includes(authUser) ? (event) => onNeutralizedEvent(event, 'downvote') : onDownVoteClick} className="flex items-center gap-1">
          {downVotesBy.includes(authUser) ? <BiSolidDislike /> : <BiDislike />}
          {downVotesBy.length}
        </button>
      </div>
    </div>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const commentItemShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(string).isRequired,
  downVotesBy: PropTypes.arrayOf(string).isRequired,
};

CommentItem.propTypes = {
  commentId: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  authUser: PropTypes.string.isRequired,
  ...commentItemShape,
};

// eslint-disable-next-line react-refresh/only-export-components
export { commentItemShape };

export default CommentItem;

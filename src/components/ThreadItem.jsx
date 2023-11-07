import PropTypes, { string } from 'prop-types';
import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom';
import ThreadItemFooter from './ThreadItemFooter.jsx';

function ThreadItem({
  isLoading,
  title,
  body,
  category = '',
  user,
  authUser,
  upVotesBy,
  downVotesBy,
  totalComments,
  createdAt,
  threadId,
}) {
  const navigate = useNavigate();

  const onThreadClick = (event) => {
    event.stopPropagation();
    navigate(`/threads/${threadId}`);
  };
  const onThreadPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      navigate(`/threads/${threadId}`);
    }
  };

  if (isLoading) {
    return (
      <div className="my-8 flex flex-wrap items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
      </div>
    );
  }
  return (
    <div role="button" tabIndex={0} onKeyDown={onThreadPress} onClick={onThreadClick} className="mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 min-w-full">
      <div className="flex flex-wrap">
        <p className="mb-2 px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
          #
          {category}
        </p>
      </div>
      <h5 className=" mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
      <p className="text-xs">
        Dibuat oleh
        {' '}
        {user.name}
      </p>
      <div className="thread-item-body mt-4">
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{parse(body)}</p>
      </div>
      <ThreadItemFooter
        threadId={threadId}
        createdAt={createdAt}
        totalComments={totalComments}
        upVotesBy={upVotesBy}
        downVotesBy={downVotesBy}
        authUser={authUser}
      />
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  category: PropTypes.string,
  authUser: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  upVotesBy: PropTypes.arrayOf(string).isRequired,
  downVotesBy: PropTypes.arrayOf(string).isRequired,
  user: PropTypes.shape(userShape).isRequired,
};

ThreadItem.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  threadId: PropTypes.string.isRequired,
  ...threadItemShape,
};

// eslint-disable-next-line react-refresh/only-export-components
export { threadItemShape, userShape };

export default ThreadItem;

import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem, { threadItemShape } from './ThreadItem.jsx';

function ThreadsList({
  threads, isLoading, onUpVote, onDownVote,
}) {
  return (
    <div className="mb-32">
      { threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          threadId={thread.id}
          isLoading={isLoading}
          onDownVote={onUpVote}
          onUpVote={onDownVote}
          {...thread}
        />
      ))}
    </div>
  );
}

ThreadsList.propTypes = {
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default ThreadsList;

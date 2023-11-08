import React from 'react';
import PropTypes from 'prop-types';
import CommentItem, { commentItemShape } from './CommentItem.jsx';

function CommentList({ comments }) {
  if (comments.length === 0) {
    return null;
  }
  return (
    <div className="mb-32">
      { comments.map((comment) => (
        <CommentItem
          key={comment.id}
          commentId={comment.id}
          name={comment.owner.name}
          avatar={comment.owner.avatar}
          {...comment}
        />
      ))}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(commentItemShape)).isRequired,
};

export default CommentList;

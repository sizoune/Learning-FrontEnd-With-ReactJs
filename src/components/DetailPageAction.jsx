import React from 'react';
import PropTypes from 'prop-types';
import { BsFillBookmarkDashFill, BsFillBookmarkPlusFill } from 'react-icons/bs';
import { MdDeleteForever } from 'react-icons/md';

function DetailPageAction({ archived, onArchiveClick, onDeleteClick }) {
  return (
    <div className="detail-page__action">
      <button type="button" className="action" title="arsipkan" onClick={onArchiveClick}>
        {archived ? <BsFillBookmarkDashFill /> : <BsFillBookmarkPlusFill />}
      </button>
      <button type="button" className="action" title="hapus" onClick={onDeleteClick}>
        <MdDeleteForever />
      </button>
    </div>
  );
}

DetailPageAction.propTypes = {
  archived: PropTypes.bool.isRequired,
  onArchiveClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default DetailPageAction;

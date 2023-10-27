import React from 'react';
import parser from 'html-react-parser';
import PropTypes from 'prop-types';
import DetailPageAction from './DetailPageAction.jsx';
import { showFormattedDate } from '../utils/index.js';

function NoteDetail({
  id, title, createdAt, body, archived, onArchiveClick, onDeleteClick,
}) {
  return (
    <section className="detail-page">
      <h3 className="detail-page__title">{title}</h3>
      <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
      <div className="detail-page__body">{parser(body)}</div>
      <DetailPageAction
        archived={archived}
        onArchiveClick={() => onArchiveClick(id)}
        onDeleteClick={() => onDeleteClick(id)}
      />
    </section>
  );
}

NoteDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onArchiveClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default NoteDetail;

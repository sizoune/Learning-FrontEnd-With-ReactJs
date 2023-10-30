import React from 'react';
import PropTypes from 'prop-types';
import DetailPageAction from './DetailPageAction.jsx';
import { showFormattedDate } from '../utils/index.js';
import NoteBodyParser from './NoteBodyParser.jsx';

function NoteDetail({
  id, title, createdAt, body, archived, onArchiveClick, onDeleteClick, isLoading,
}) {
  if (isLoading) {
    return (
      <section className="detail-page">
        <p>Mohong Tunggu ...</p>
      </section>
    );
  }
  return (
    <section className="detail-page">
      <h3 className="detail-page__title">{title}</h3>
      <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
      <NoteBodyParser body={body} />
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
  isLoading: PropTypes.bool.isRequired,
  onArchiveClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default NoteDetail;

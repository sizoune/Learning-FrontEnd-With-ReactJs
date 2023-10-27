import React from 'react';
import { Link } from 'react-router-dom';
import * as PropType from 'prop-types';
import parser from 'html-react-parser';
import { showFormattedDate } from '../utils/index.js';

function NoteItem({
  id, title, createdAt, body,
}) {
  return (
    <article className="note-item">
      <h3 className="note-item__title">
        <Link to={`/notes/${id}`}>{title}</Link>
      </h3>
      <p className="note-item__date">
        {showFormattedDate(createdAt)}
      </p>
      <p className="note-item__body">
        {parser(body)}
      </p>

    </article>
  );
}

NoteItem.propTypes = {
  id: PropType.string.isRequired,
  title: PropType.string.isRequired,
  createdAt: PropType.string.isRequired,
  body: PropType.string.isRequired,
};

export default NoteItem;

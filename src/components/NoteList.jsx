import React from 'react';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem.jsx';

function NoteList({ notes }) {
  if (notes.length === 0) {
    return (
      <section className="notes-list-empty">
        <p>Tidak Ada Catatan!</p>
      </section>
    );
  }
  return (
    <div className="notes-list">
      { notes.map((note) => (
        <NoteItem
          key={note.id}
          {...note}
        />
      ))}
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NoteList;

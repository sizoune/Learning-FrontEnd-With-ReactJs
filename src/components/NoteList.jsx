import React from 'react';
import NoteItem from './NoteItem.jsx';

function NoteList({
  notes, onDelete, onMove,
}) {
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          onDelete={onDelete}
          onMove={onMove}
          {...note}
        />
      ))}
    </div>
  );
}

export default NoteList;

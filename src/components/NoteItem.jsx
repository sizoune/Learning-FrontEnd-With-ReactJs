import React from 'react';
import NoteItemContent from './NoteItemContent.jsx';
import NoteItemAction from './NoteItemAction.jsx';

function NoteItem({
  id, title, createdAt, body, archived, onDelete, onMove,
}) {
  return (
    <div className="note-item">
      <NoteItemContent title={title} date={createdAt} body={body} />
      <NoteItemAction
        id={id}
        archived={archived}
        onDelete={onDelete}
        onMove={onMove}
      />
    </div>
  );
}

export default NoteItem;

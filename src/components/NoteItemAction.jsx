import React from 'react';

function NoteItemAction({
  id, archived, onDelete, onMove,
}) {
  return (
    <div className="note-item__action">
      <button type="button" className="note-item__delete-button" onClick={() => onDelete(id)}>Hapus</button>
      <button type="button" className="note-item__archive-button" onClick={() => onMove(id)}>{archived ? 'Pindahkan' : 'Arsipkan'}</button>
    </div>
  );
}

export default NoteItemAction;

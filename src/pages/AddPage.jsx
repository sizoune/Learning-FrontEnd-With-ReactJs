import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/local-data.js';
import AddNewNoteInput from '../components/AddNewNoteInput.jsx';

function AddPage() {
  const navigate = useNavigate();

  function onSubmitNoteHandler(newNote) {
    addNote(newNote);
    navigate('/');
  }

  return (
    <AddNewNoteInput onSubmit={onSubmitNoteHandler} />
  );
}

export default AddPage;

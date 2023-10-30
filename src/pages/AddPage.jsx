import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/network-data.js';
import AddNewNoteInput from '../components/AddNewNoteInput.jsx';

function AddPage() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = React.useState(false);

  async function onSubmitNoteHandler(newNote) {
    setLoading(true);
    await addNote(newNote);
    setLoading(false);
    navigate('/');
  }

  return (
    <AddNewNoteInput onSubmit={onSubmitNoteHandler} isLoading={isLoading} />
  );
}

export default AddPage;

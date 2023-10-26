import React from 'react';
import autoBind from 'react-auto-bind';
import { getInitialData } from '../utils/index.js';
import NoteList from './NoteList.jsx';
import NoteInput from './NoteInput.jsx';

class NoteAppBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),
    };

    autoBind(this);
  }

  onAddNoteHandler({ judul, catatan }) {
    this.setState((prevState) => ({
      notes: [
        ...prevState.notes,
        {
          id: +new Date(),
          title: judul,
          body: catatan,
          createdAt: new Date().toISOString(),
          archived: false,
        },
      ],
    }));
  }

  onDeleteHandler(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes });
  }

  onMoveHandler(id) {
    this.setState((prevState) => {
      const selectedNote = prevState.notes.find((item) => item.id === id);
      selectedNote.archived = !selectedNote.archived;
      return {
        notes: prevState.notes,
      };
    });
  }

  render() {
    return (
      <div className="note-app__body">
        <h2>Buat Catatan</h2>
        <NoteInput addNote={this.onAddNoteHandler} />
        <h2>Catatan Aktif</h2>
        {this.state.notes.filter((note) => !note.archived).length > 0
          ? (
            <NoteList
              notes={this.state.notes.filter((note) => !note.archived)}
              onDelete={this.onDeleteHandler}
              onMove={this.onMoveHandler}
            />
          )
          : <p className="notes-list__empty-message">Tidak Ada Catatan!</p>}
        <h2>Arsip</h2>
        {this.state.notes.filter((note) => note.archived).length > 0
          ? (
            <NoteList
              notes={this.state.notes.filter((note) => note.archived)}
              onDelete={this.onDeleteHandler}
              onMove={this.onMoveHandler}
            />
          )
          : <p className="notes-list__empty-message">Tidak Ada Catatan!</p>}
      </div>
    );
  }
}

export default NoteAppBody;

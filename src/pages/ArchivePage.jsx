import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import autoBind from 'react-auto-bind';
import { IoAddSharp } from 'react-icons/io5';
import { getAllNotes, getArchivedNotes } from '../utils/local-data.js';
import SearchBar from '../components/SearchBar.jsx';
import NoteList from '../components/NoteList.jsx';

function ArchivePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const keywordParam = searchParams.get('keyword');

  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }
  return (
    <ArchivePage
      defaultKeyword={keywordParam}
      keywordChange={changeSearchParams}
    />
  );
}

class ArchivePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getArchivedNotes(),
      keyword: props.defaultKeyword || '',
    };

    autoBind(this);
  }

  onKeywordChangeHandler(keyword) {
    this.setState(() => ({
      keyword,
    }));

    this.props.keywordChange(keyword);
  }

  render() {
    const notes = this.state.notes.filter((note) => note.title.toLowerCase().includes(
      this.state.keyword.toLowerCase(),
    ));
    if (notes.length === 0) {
      return (
        <section className="notes-list-empty">
          <p>Tidak Ada Catatan!</p>
        </section>
      );
    }
    return (
      <section>
        <h2>Catatan Aktif</h2>
        <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
        <NoteList notes={notes} />
      </section>
    );
  }
}

export default ArchivePageWrapper;

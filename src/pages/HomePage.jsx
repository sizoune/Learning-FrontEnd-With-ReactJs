import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import autoBind from 'react-auto-bind';
import { IoAddSharp } from 'react-icons/io5';
import { getActiveNotes, getAllNotes } from '../utils/local-data.js';
import SearchBar from '../components/SearchBar.jsx';
import NoteList from '../components/NoteList.jsx';

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const keywordParam = searchParams.get('keyword');

  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  function navigateToAddPageHandler() {
    navigate('/notes/new');
  }

  return (
    <HomePage
      defaultKeyword={keywordParam}
      keywordChange={changeSearchParams}
      navigateToAddPage={navigateToAddPageHandler}
    />
  );
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getActiveNotes(),
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

  onAddNoteHandler(event) {
    event.preventDefault();

    this.props.navigateToAddPage();
  }

  render() {
    const notes = this.state.notes.filter((note) => note.title.toLowerCase().includes(
      this.state.keyword.toLowerCase(),
    ));

    return (
      <section>
        <h2>Catatan Aktif</h2>
        <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
        <NoteList notes={notes} />
        <div className="homepage__action">
          <button type="button" className="action" title="tambah" onClick={(event) => this.onAddNoteHandler(event)}>
            <IoAddSharp />
          </button>
        </div>
      </section>
    );
  }
}

export default HomePageWrapper;

import React from 'react';
import { useSearchParams } from 'react-router-dom';
import autoBind from 'react-auto-bind';
import PropTypes from 'prop-types';
import { getArchivedNotes } from '../utils/local-data.js';
import SearchBar from '../components/SearchBar.jsx';
import NoteList from '../components/NoteList.jsx';

function ArchivePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();

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
    return (
      <section>
        <h2>Catatan Arsip</h2>
        <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
        <NoteList notes={notes} />
      </section>
    );
  }
}

ArchivePage.propTypes = {
  keywordChange: PropTypes.func.isRequired,
};

export default ArchivePageWrapper;

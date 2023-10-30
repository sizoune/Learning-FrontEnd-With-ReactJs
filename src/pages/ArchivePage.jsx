import React from 'react';
import { useSearchParams } from 'react-router-dom';
import autoBind from 'react-auto-bind';
import PropTypes from 'prop-types';
import { getArchivedNotes } from '../utils/network-data.js';
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
      notes: [],
      isLoading: true,
      keyword: props.defaultKeyword || '',
    };

    autoBind(this);
  }

  async componentDidMount() {
    const { data } = await getArchivedNotes();

    this.setState(() => ({
      isLoading: false,
      notes: data,
    }));
  }

  onKeywordChangeHandler(keyword) {
    this.setState(() => ({
      keyword,
    }));

    this.props.keywordChange(keyword);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <section className="notes-list-empty">
          <p>Sedang Mengambil Data!, Mohon Tunggu ...</p>
        </section>
      );
    }

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
  // eslint-disable-next-line react/require-default-props
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};

export default ArchivePageWrapper;

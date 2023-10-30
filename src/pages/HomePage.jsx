import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import autoBind from 'react-auto-bind';
import { IoAddSharp } from 'react-icons/io5';
import PropTypes from 'prop-types';
import { getActiveNotes } from '../utils/network-data.js';
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
      notes: [],
      isLoading: true,
      keyword: props.defaultKeyword || '',
    };

    autoBind(this);
  }

  async componentDidMount() {
    const { data } = await getActiveNotes();

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

  onAddNoteHandler(event) {
    event.preventDefault();

    this.props.navigateToAddPage();
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

HomePage.propTypes = {
  // eslint-disable-next-line react/require-default-props
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
  navigateToAddPage: PropTypes.func.isRequired,
};

export default HomePageWrapper;

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import autoBind from 'react-auto-bind';
import PropTypes from 'prop-types';
import {
  archiveNote, deleteNote, getNote, unarchiveNote,
} from '../utils/network-data.js';
import NoteDetail from '../components/NoteDetail.jsx';

function DetailPageWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();

  function backToHomeHandler() {
    navigate('/');
  }

  return <DetailPage id={id} backtoHome={backToHomeHandler} />;
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: null,
      isGettingData: true,
      isLoading: false,
    };

    autoBind(this);
  }

  async componentDidMount() {
    const { data } = await getNote(this.props.id);
    this.setState(() => ({
      isGettingData: false,
      note: data,
    }));
  }

  async onDeleteHandler(id) {
    this.setState(() => ({ isLoading: true }));
    await deleteNote(id);
    this.setState(() => ({ isLoading: false }));
    this.props.backtoHome();
  }

  async onArchiveHandler(id) {
    this.setState(() => ({ isLoading: true }));
    if (this.state.note.archived) {
      await unarchiveNote(id);
    } else {
      await archiveNote(id);
    }
    this.setState(() => ({ isLoading: false }));
    this.props.backtoHome();
  }

  render() {
    if (this.state.isGettingData) {
      return (
        <section className="notes-list-empty">
          <p>Sedang Mengambil Data!, Mohon Tunggu ...</p>
        </section>
      );
    }

    if (this.state.note === null) {
      return <p>Note not found!</p>;
    }

    return (
      <section>
        <NoteDetail
          onDeleteClick={this.onDeleteHandler}
          onArchiveClick={this.onArchiveHandler}
          isLoading={this.state.isLoading}
          {...this.state.note}
        />
      </section>
    );
  }
}

DetailPage.propTypes = {
  id: PropTypes.string.isRequired,
  backtoHome: PropTypes.func.isRequired,
};

export default DetailPageWrapper;

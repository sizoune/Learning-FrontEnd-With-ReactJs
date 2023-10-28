import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import autoBind from 'react-auto-bind';
import PropTypes from 'prop-types';
import {
  archiveNote, deleteNote, getNote, unarchiveNote,
} from '../utils/local-data.js';
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
      note: getNote(props.id),
    };

    autoBind(this);
  }

  onDeleteHandler(id) {
    deleteNote(id);
    this.props.backtoHome();
  }

  onArchiveHandler(id) {
    if (getNote(id).archived) {
      unarchiveNote(id);
    } else {
      archiveNote(id);
    }
    this.props.backtoHome();
  }

  render() {
    if (this.state.note === null) {
      return <p>Note not found!</p>;
    }

    return (
      <section>
        <NoteDetail
          onDeleteClick={this.onDeleteHandler}
          onArchiveClick={this.onArchiveHandler}
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

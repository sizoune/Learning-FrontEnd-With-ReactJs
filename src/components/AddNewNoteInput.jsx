import React from 'react';
import autoBind from 'react-auto-bind';
import PropTypes from 'prop-types';
import { BsCheckLg } from 'react-icons/bs';

class AddNewNoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
    };

    autoBind(this);
  }

  onTitleChangeHandler(event) {
    this.setState(() => ({
      title: event.target.value,
    }));
  }

  onBodyChangeHandler(event) {
    this.setState(() => ({
      body: event.target.innerHTML,
    }));
  }

  onSubmitNoteHandler(event) {
    event.preventDefault();

    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <>
        <div className="add-new-page__input">
          <input className="add-new-page__input__title" placeholder="Judul..." value={this.state.title} onChange={this.onTitleChangeHandler} />
          <div
            className="add-new-page__input__body"
            data-placeholder="Sebenarnya saya adalah ...."
            contentEditable
            onInput={this.onBodyChangeHandler}
          />
        </div>
        <div className="add-new-page__action">
          <button type="button" className="action" title="simpan" onClick={(event) => this.onSubmitNoteHandler(event)}>
            <BsCheckLg />
          </button>
        </div>
      </>
    );
  }
}

AddNewNoteInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddNewNoteInput;

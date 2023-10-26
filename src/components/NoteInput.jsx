import React from 'react';
import autoBind from 'react-auto-bind';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      judul: '',
      catatan: '',
      judulCharLeft: 50,
    };

    autoBind(this);
  }

  onJudulChangeEventHandler(event) {
    const newJudul = event.target.value;
    const charLeft = 50 - newJudul.length;
    if (charLeft >= 0) {
      this.setState({
        judul: newJudul,
        judulCharLeft: charLeft,
      });
    }
  }

  onCatatanChangeEventHandler(event) {
    this.setState(() => ({
      catatan: event.target.value,
    }));
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.addNote(this.state);
  }

  render() {
    return (
      <div className="note-input">
        <p className="note-input__title__char-limit">
          Sisa Karakter :
          {' '}
          {this.state.judulCharLeft}
        </p>
        <form onSubmit={this.onSubmitEventHandler}>
          <input className="note-input__title" type="text" placeholder="Ini adalah judul..." value={this.state.judul} onChange={this.onJudulChangeEventHandler} />
          <textarea className="note-input__body" type="text" placeholder="Tuliskan catatanmu di sini..." value={this.state.catatan} onChange={this.onCatatanChangeEventHandler} />
          <button type="submit">Buat</button>
        </form>
      </div>
    );
  }
}

export default NoteInput;

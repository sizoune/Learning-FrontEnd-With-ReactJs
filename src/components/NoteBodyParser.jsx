import React from 'react';
import parser from 'html-react-parser';
import PropTypes from 'prop-types';

function NoteBodyParser({ body }) {
  return (
    <div>
      {parser(body)}
    </div>
  );
}

NoteBodyParser.propTypes = {
  body: PropTypes.string.isRequired,
};

export default NoteBodyParser;

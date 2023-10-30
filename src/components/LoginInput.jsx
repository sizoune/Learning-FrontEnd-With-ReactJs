import React from 'react';
import PropTypes from 'prop-types';
import useInput from './UseInput.jsx';

function InputLogin({ isLoading = false, onSubmit }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <div className="input-login">
      <label htmlFor="email">Email</label>
      <input type="email" id="email" value={email} onChange={onEmailChange} />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" value={password} onChange={onPasswordChange} />
      {isLoading
        ? <div className="notes-list-empty"><p>Mohon Tunggu ...</p></div>
        : <button type="button" onClick={() => onSubmit({ email, password })}>Masuk</button>}
    </div>
  );
}
InputLogin.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default InputLogin;

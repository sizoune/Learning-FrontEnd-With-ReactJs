import React from 'react';
import PropTypes from 'prop-types';
import useInput from './UseInput.jsx';

function RegisterInput({ isLoading = false, onSubmit }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confPassword, onConfPasswordChange] = useInput('');

  return (
    <div className="input-register">
      <label htmlFor="name">Nama</label>
      <input type="email" id="name" value={name} onChange={onNameChange} />
      <label htmlFor="email">Email</label>
      <input type="email" id="email" value={email} onChange={onEmailChange} />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" value={password} onChange={onPasswordChange} />
      <label htmlFor="conf_pass">Konfirmasi Password</label>
      <input type="password" id="conf_pass" value={confPassword} onChange={onConfPasswordChange} />
      {isLoading
        ? <div className="notes-list-empty"><p>Mohon Tunggu ...</p></div>
        : (
          <button
            type="button"
            onClick={() => onSubmit({
              name, email, password, confPassword,
            })}
          >
            Daftar
          </button>
        )}
    </div>
  );
}
RegisterInput.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default RegisterInput;

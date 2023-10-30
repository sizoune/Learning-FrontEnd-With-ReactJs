import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginInput from '../components/LoginInput.jsx';
import { login } from '../utils/network-data.js';

function LoginPage({ loginSuccess }) {
  const [isLoading, setLoading] = React.useState(false);

  async function onSubmitHandler({ email, password }) {
    setLoading(true);
    const { error, data } = await login({ email, password });
    setLoading(false);
    if (!error) {
      loginSuccess(data);
    }
  }

  return (
    <section className="login-page">
      <h2>Silakan masuk untuk melanjutkan ...</h2>
      <LoginInput isLoading={isLoading} onSubmit={onSubmitHandler} />
      <p>
        Belum punya akun?
        <Link to="/register">Daftar di sini.</Link>
      </p>
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { register } from '../utils/network-data.js';

function RegisterPage() {
  const [isLoading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  async function onRegisterHandler(user) {
    const { password, confPassword } = user;
    if (password === confPassword) {
      setLoading(true);
      const { error } = await register(user);
      setLoading(false);
      if (!error) {
        navigate('/');
      }
    } else {
      // eslint-disable-next-line no-alert
      alert('Konfirmasi Password Salah');
    }
  }

  return (
    <section className="register-page">
      <h2>Isi form untuk mendaftar akun ...</h2>
      <RegisterInput isLoading={isLoading} onSubmit={onRegisterHandler} />
      <p>
        Kembali ke
        <Link to="/"> Masuk</Link>
      </p>
    </section>
  );
}

export default RegisterPage;

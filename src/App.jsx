import React from 'react';
import {
  Link, Route, Routes,
} from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
import HomePage from './pages/HomePage.jsx';
import AddPage from './pages/AddPage.jsx';
import DetailPage from './pages/DetailPage.jsx';
import ArchivePage from './pages/ArchivePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ThemeContext from './contexts/ThemeContext.js';
import RegisterPage from './pages/RegisterPage.jsx';
import { getAccessToken, getUserLogged, putAccessToken } from './utils/network-data.js';
import NotFoundPage from './pages/NotFoundPage.jsx';

function App() {
  const [theme, setTheme] = React.useState('light');
  const [accessToken, setAccessToken] = React.useState(null);
  const [loggedUser, setLoggedUser] = React.useState(null);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const themeContextValue = React.useMemo(() => ({
    theme,
    toggleTheme,
  }), [theme]);

  React.useEffect(() => {
    setTheme(localStorage.getItem('theme') || 'light');
    setAccessToken(getAccessToken());
  }, []);

  React.useEffect(() => {
    putAccessToken(accessToken);
    getUserLogged().then(({ data }) => {
      setLoggedUser(data);
    });
  }, [accessToken]);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <div className="app-container" data-theme={theme}>
        <header>
          <h1><Link to="/">Aplikasi Catatan</Link></h1>
          <Navigation loggedUser={loggedUser} onLogoutClick={() => setAccessToken(null)} />
        </header>
        <main>
          {loggedUser === null ? (
            <Routes>
              <Route path="/register" element={<RegisterPage />} />
              {/* eslint-disable-next-line no-shadow */}
              <Route path="/*" element={<LoginPage loginSuccess={({ accessToken }) => setAccessToken(accessToken)} />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/archives" element={<ArchivePage />} />
              <Route path="/notes/new" element={<AddPage />} />
              <Route path="/notes/:id" element={<DetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          )}
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

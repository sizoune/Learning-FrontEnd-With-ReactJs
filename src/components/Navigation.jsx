import React from 'react';
import { Link } from 'react-router-dom';
import { FiSun } from 'react-icons/fi';
import { MdDarkMode } from 'react-icons/md';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import PropTypes from 'prop-types';
import ThemeContext from '../contexts/ThemeContext.js';

function Navigation({ loggedUser, onLogoutClick }) {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  return (
    <>
      <nav className="navigation">
        {loggedUser !== null ? (
          <ul>
            <li>
              <Link to="/archives">
                Arsip
              </Link>
            </li>
          </ul>
        ) : null}
      </nav>
      <button className="toggle-theme" type="button" onClick={toggleTheme}>{theme === 'light' ? <MdDarkMode /> : <FiSun />}</button>
      {loggedUser !== null ? (
        <button className="button-logout" type="button" onClick={onLogoutClick}>
          <RiLogoutCircleRLine />
          {loggedUser.name}
        </button>
      ) : null}
    </>
  );
}

Navigation.propTypes = {
  loggedUser: PropTypes.object,
  onLogoutClick: PropTypes.func.isRequired,
};

export default Navigation;

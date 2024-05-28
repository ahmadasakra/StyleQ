import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import '../Header/Header.css';

const Header = ({ toggleTheme, theme }) => {
  const { t, i18n } = useTranslation();
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguageMenuOpen(false);
  };

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">{t('home')}</Link></li>
          <li><Link to="/services">{t('services')}</Link></li>
          <li><Link to="/portfolio">{t('portfolio')}</Link></li>
          <li><Link to="/about">{t('about')}</Link></li>
          <li><Link to="/contact">{t('contact')}</Link></li>
          <li><Link to="/signup">{t('Signup')}</Link></li>
        </ul>
      </nav>
      <div className="actions">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <div className="language-selector" onClick={() => setLanguageMenuOpen(!languageMenuOpen)}>
          <FontAwesomeIcon icon={faGlobe} />
          {languageMenuOpen && (
            <ul className="language-menu">
              <li onClick={() => changeLanguage('en')}>EN</li>
              <li onClick={() => changeLanguage('de')}>DE</li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

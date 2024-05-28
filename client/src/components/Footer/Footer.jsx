import React from 'react';
import { useTranslation } from 'react-i18next';
import '../Footer/Footer.css';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="footer-content">
        <p>&copy; 2024 StylqQ</p>
        <nav>
          <ul>
            <li><a href="/">{t('home')}</a></li>
            <li><a href="/services">{t('services')}</a></li>
            <li><a href="/portfolio">{t('portfolio')}</a></li>
            <li><a href="/about">{t('about')}</a></li>
            <li><a href="/contact">{t('contact')}</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
